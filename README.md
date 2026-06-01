# ABBA

This project uses 'pnpm' workspaces to manage dependencies for the application, shared packages, and infrastructure.

## Workspace Structure

```
abba/
├── apps/              # Applications
│   └── web/           # Next.js web application
│   └── api/           # Backend application
├── packages/          # Shared internal libraries (UI components, configs, etc.)
├── infra/             # Infrastructure as code
├── docs/              # Documentation
├── scripts/           # Development and build scripts
└── package.json       # Workspace root
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

## Workspace Commands

All commands are run from the root directory:

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm test` - Run tests
- `pnpm lint` - Lint all packages
- `pnpm -r exec <command>` - Run command in all packages
- `pnpm --filter <package> <command>` - Run command in specific package

## Adding New Apps or Packages

1. Create a new directory in `apps/` or `packages/`
2. Add a `package.json` with the workspace protocol
3. Run `pnpm install` to update workspace locks
