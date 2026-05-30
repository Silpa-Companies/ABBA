/**
 * Upload the local .claude/skills/client-clinician-matcher/ directory to Anthropic.
 *
 *   1. Regenerates .claude/skills/client-clinician-matcher/references/config.json
 *      from API_BASE_URL in .env so the bundled skill always has the current endpoints.
 *   2. If SKILL_ID is set in .env, uploads a new VERSION to that existing skill.
 *      Otherwise, creates a new skill and writes SKILL_ID back to .env.
 *
 * Usage:
 *   npx tsx cloud-agent-setup-script/upload-skill.ts
 *
 * Required in .env: ANTHROPIC_API_KEY, API_BASE_URL
 */
import "dotenv/config";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import Anthropic, { toFile } from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SKILL_DIR = path.join(REPO_ROOT, ".claude", "skills", "client-clinician-matcher");
const ENV_PATH = path.join(REPO_ROOT, ".env");
const DISPLAY_TITLE = "Client Clinician Matcher";

// Local-runtime cache files written by helpers/fetch_profiles.py — never upload these.
const EXCLUDE = new Set([".DS_Store", "client.json", "clinicians.json"]);

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

function writeConfig(apiBaseUrl: string): string {
  const base = apiBaseUrl.replace(/\/+$/, "");
  const configPath = path.join(SKILL_DIR, "references", "config.json");
  const config = {
    clinicians_url: `${base}/api/clinicians/`,
    client_url_template: `${base}/api/clients/{uuid}/`,
  };
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
  return configPath;
}

function buildZip(): string {
  if (!fs.existsSync(path.join(SKILL_DIR, "SKILL.md"))) {
    throw new Error(`Missing SKILL.md at ${SKILL_DIR}`);
  }
  const zipPath = path.join(os.tmpdir(), `skill-upload-${Date.now()}.zip`);
  const skillName = path.basename(SKILL_DIR);
  const excludeArgs = Array.from(EXCLUDE).flatMap((p) => ["-x", `${skillName}/${p}`, `${skillName}/**/${p}`]);
  // Run zip from the parent dir so entries are stored as `<skillName>/SKILL.md`, `<skillName>/helpers/...`.
  // The API needs SKILL.md inside a single top-level folder in the archive.
  execFileSync("zip", ["-rq", zipPath, skillName, ...excludeArgs], {
    cwd: path.dirname(SKILL_DIR),
    stdio: "inherit",
  });
  return zipPath;
}

async function main() {
  const apiKey = requireEnv("ANTHROPIC_API_KEY");
  const apiBaseUrl = requireEnv("API_BASE_URL");
  const client = new Anthropic({ apiKey });

  const configPath = writeConfig(apiBaseUrl);
  console.log(`Wrote ${path.relative(REPO_ROOT, configPath)}`);

  const zipPath = buildZip();
  const zipName = path.basename(zipPath);
  console.log(`Built ${zipPath} (${fs.statSync(zipPath).size} bytes)`);

  try {
    const file = await toFile(fs.createReadStream(zipPath), zipName);

    const existingSkillId = process.env.SKILL_ID;
    if (existingSkillId) {
      console.log(`SKILL_ID=${existingSkillId} found in .env — uploading new version…`);
      const version = await client.beta.skills.versions.create(existingSkillId, { files: [file] });
      console.log(`  new version: ${version.version}`);
    } else {
      console.log("No SKILL_ID in .env — creating a new skill…");
      const skill = await client.beta.skills.create({
        display_title: DISPLAY_TITLE,
        files: [file],
      });
      console.log(`  skill_id=${skill.id} latest_version=${skill.latest_version}`);
      upsertEnv({ SKILL_ID: skill.id });
      console.log("  wrote SKILL_ID to .env");
    }
  } finally {
    fs.rmSync(zipPath, { force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});