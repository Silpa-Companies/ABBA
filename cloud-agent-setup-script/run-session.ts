/**
 * Open a session against the agent created by setup-agent.ts and stream its output.
 *
 * Usage:
 *   npx tsx cloud-agent-setup-script/run-session.ts <client-uuid>
 *   npx tsx cloud-agent-setup-script/run-session.ts --message "your prompt"
 */
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. Run cloud-agent-setup-script/setup-agent.ts first.`);
  return v;
}

function parseArgs(): { message: string } {
  const args = process.argv.slice(2);
  const msgIdx = args.indexOf("--message");
  if (msgIdx >= 0 && args[msgIdx + 1]) return { message: args[msgIdx + 1] };
  const positional = args.find((a) => !a.startsWith("--"));
  if (!positional) {
    throw new Error("Pass a client UUID, e.g. `npx tsx cloud-agent-setup-script/run-session.ts <uuid>`");
  }
  return { message: `Match client ${positional} to the best-fit clinicians.` };
}

async function main() {
  const { message } = parseArgs();
  const apiKey = requireEnv("ANTHROPIC_API_KEY");
  const agentId = requireEnv("AGENT_ID");
  const environmentId = requireEnv("ENVIRONMENT_ID");

  const client = new Anthropic({ apiKey });

  const session = await client.beta.sessions.create({
    agent: agentId,
    environment_id: environmentId,
    title: "clinician-match",
  });
  console.error(`session_id=${session.id}`);

  const stream = await client.beta.sessions.events.stream(session.id);

  await client.beta.sessions.events.send(session.id, {
    events: [
      {
        type: "user.message",
        content: [{ type: "text", text: message }],
      },
    ],
  });

  for await (const event of stream) {
    switch (event.type) {
      case "agent.message":
        for (const block of event.content) {
          if ("text" in block) process.stdout.write(block.text);
        }
        break;
      case "agent.tool_use":
        process.stderr.write(`\n[tool: ${event.name}]\n`);
        break;
      case "session.status_idle":
        process.stdout.write("\n");
        return;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});