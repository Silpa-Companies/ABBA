import { NextResponse } from "next/server";
import { query } from "@anthropic-ai/claude-agent-sdk";
import path from "node:path";

// Local matcher: runs Claude Code in-process via the Agent SDK
// No managed-agent session, no remote container —
// the model decides to read .claude/skills/client-clinician-matcher/ from disk
// and shells out to its helpers right here on the host.

export const maxDuration = 300;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: clientId } = await params;
  // Claude Code agent runs on project root, so it can scan the skill automatically
  const cwd = path.resolve(process.cwd());

  let text = "";

  for await (const msg of query({
    prompt: `Match client ${clientId} to the best-fit clinicians.`,
    options: {
      cwd,
      // Server-side, no human to approve tool calls — auto-allow everything.
      permissionMode: "bypassPermissions",
      skills: "all",
    },
  })) {
    if (msg.type === "system" && msg.subtype === "init") {
      // Report available skills
      console.log(`init skills=${JSON.stringify(msg.skills)}`);
    } else if (msg.type === "assistant") {
      for (const block of msg.message.content) {
        if (block.type === "text") {
          text += block.text;
        } else if (block.type === "tool_use") {
          const inner = JSON.stringify(block.input).slice(1, -1);
          console.log(`tool_use name=${block.name} ${truncate(inner)}\n\n\n`);
        }
      }
    } else if (msg.type === "result") {
      console.log(`result stop_reason=${msg.stop_reason} cost=$${msg.total_cost_usd}`);
    }
  }

  console.log(`agent text:\n${text}`);

  return NextResponse.json({ matched_clinicians: extractMatches(text), text });
}

function truncate(s: string, max = 500): string {
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function extractMatches(text: string): unknown[] | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidates = [fenced?.[1], text].filter(Boolean) as string[];
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate.trim());
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // try the next candidate
    }
  }
  return null;
}