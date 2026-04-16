<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Sub-agent execution mode

- Always run sub-agents on the main workspace by default.
- Do not use worktree isolation for sub-agents unless the user explicitly requests worktree usage for that specific task.
