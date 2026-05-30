/**
 * Provision (or reconcile) a managed agent + environment for the client-clinician-matcher skill.
 *
 *   - If ENVIRONMENT_ID / AGENT_ID are already in .env, the corresponding resource
 *     is retrieved and updated to match the desired config.
 *   - If an ID is missing or the resource no longer exists (404), a new one is created.
 *   - ENVIRONMENT_ID / AGENT_ID in .env are always upserted to the active IDs.
 *
 * Usage:
 *   npx tsx cloud-agent-setup-script/setup-agent.ts
 *
 * Required in .env: ANTHROPIC_API_KEY, SKILL_ID
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(REPO_ROOT, ".env");

const ENVIRONMENT_CONFIG: Anthropic.Beta.Environments.EnvironmentCreateParams["config"] = {
  type: "cloud",
  networking: { type: "unrestricted" },
};

const AGENT_BASE = {
  name: "Clinician Matcher",
  model: "claude-opus-4-7" as const,
  tools: [{ type: "agent_toolset_20260401" as const }],
  // Explicitly null — clears any stale system prompt from earlier setup runs.
  // The agent should rely entirely on the skill's SKILL.md + references/config.json.
  system: null,
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. Add it to .env or export it.`);
  return v;
}

function upsertEnv(updates: Record<string, string>): void {
  const existing = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, "utf8") : "";
  const lines = existing.split("\n");
  for (const [key, value] of Object.entries(updates)) {
    const re = new RegExp(`^${key}=.*$`);
    const idx = lines.findIndex((l) => re.test(l));
    const formatted = `${key}=${value}`;
    if (idx >= 0) lines[idx] = formatted;
    else lines.push(formatted);
  }
  fs.writeFileSync(ENV_PATH, lines.join("\n"));
}

function isNotFound(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    (err as { status?: number }).status === 404
  );
}

async function ensureEnvironment(client: Anthropic, existingId: string | undefined): Promise<string> {
  if (existingId) {
    try {
      const env = await client.beta.environments.update(existingId, { config: ENVIRONMENT_CONFIG });
      console.log(`Updated environment ${env.id}`);
      return env.id;
    } catch (err) {
      if (!isNotFound(err)) throw err;
      console.log(`Environment ${existingId} not found — creating a new one.`);
    }
  }
  const env = await client.beta.environments.create({
    name: `clinician-matcher-${Date.now()}`,
    config: ENVIRONMENT_CONFIG,
  });
  console.log(`Created environment ${env.id}`);
  return env.id;
}

async function ensureAgent(
  client: Anthropic,
  existingId: string | undefined,
  skillId: string,
): Promise<string> {
  const skills = [{ type: "custom" as const, skill_id: skillId, version: "latest" }];
  if (existingId) {
    try {
      const current = await client.beta.agents.retrieve(existingId);
      const updated = await client.beta.agents.update(existingId, {
        ...AGENT_BASE,
        skills,
        version: current.version,
      });
      console.log(`Updated agent ${updated.id} (v${updated.version})`);
      return updated.id;
    } catch (err) {
      if (!isNotFound(err)) throw err;
      console.log(`Agent ${existingId} not found — creating a new one.`);
    }
  }
  const agent = await client.beta.agents.create({ ...AGENT_BASE, skills });
  console.log(`Created agent ${agent.id} (v${agent.version})`);
  return agent.id;
}

async function main() {
  const apiKey = requireEnv("ANTHROPIC_API_KEY");
  const skillId = requireEnv("SKILL_ID");
  const client = new Anthropic({ apiKey });

  const environmentId = await ensureEnvironment(client, process.env.ENVIRONMENT_ID);
  const agentId = await ensureAgent(client, process.env.AGENT_ID, skillId);

  upsertEnv({ ENVIRONMENT_ID: environmentId, AGENT_ID: agentId });
  console.log("\nDone. IDs written to .env. Next:");
  console.log("  npx tsx cloud-agent-setup-script/run-session.ts <client-uuid>");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
