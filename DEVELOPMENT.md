# Development Setup

## Prerequisites

- A free GitHub account: https://github.com

## Quick setup with DevPod (recommended)

[DevPod](https://devpod.sh) automatically starts a ready-to-use development environment with no manual installation needed.

1. Download and install DevPod: https://devpod.sh/docs/getting-started/install
2. Install VS Code: https://code.visualstudio.com/download
3. Open the project in DevPod:
   ```
   devpod up https://github.com/<org>/act-ai-lab-smitl --ide vscode
   ```
   Alternatively, use the DevPod GUI and paste the repository URL.

DevPod automatically handles:
- Node.js installation
- `openspec` installation (`npm install -g @fission-ai/openspec@latest`)
- Playwright + Chromium installation (required for AI browser agents)

---

## Manual setup (alternative)

If you prefer not to use DevPod:

1. Install VS Code: https://code.visualstudio.com/download
2. Install Node.js: https://nodejs.org/en/download
3. From the VS Code terminal, install openspec:
   ```bash
   npm install -g @fission-ai/openspec@latest
   openspec --version
   ```

---

## MCP Servers (AI browser tools)

This project includes pre-configured MCP servers for AI-assisted frontend testing (e.g. the `/stupid-user` agent).

| Server | Purpose |
|--------|---------|
| `@playwright/mcp` | Primary — headless browser, works everywhere, auto-installs Chromium |
| `chrome-devtools-mcp` | Optional — requires Chrome/Chromium installed on your machine |

### DevPod (automatic)

MCP servers are installed automatically during container creation. No action needed.

### Manual setup

If you are not using DevPod, follow the official setup guides:

- [`@playwright/mcp` — Getting Started](https://playwright.dev/docs/getting-started-mcp)
- [`chrome-devtools-mcp` — README](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/README.md)

### AI tool config files

MCP server configs are pre-committed for all major AI tools:

| Tool | Config file |
|------|-------------|
| Claude Code | `.mcp.json` |
| Cursor | `.cursor/mcp.json` |
| VS Code / GitHub Copilot | `.vscode/mcp.json` |
| Windsurf | `.windsurf/mcp.json` |

No additional setup required — your AI tool will pick up the config automatically on project open.

> **Note:** `chrome-devtools-mcp` requires Chrome or Chromium installed on your local machine and is optional.
> `@playwright/mcp` is the recommended server and works out of the box in all environments.

---

## AI Agents

This project includes reusable AI agents under `.agents/`:

| Agent | File | Invoke |
|-------|------|--------|
| Stupid User (sommelier) | `.agents/stupid-user.md` | Claude Code: `/stupid-user` · Others: attach file as context |

The **stupid-user** agent simulates **Roberto**, a master sommelier with zero tech skills.
It navigates the frontend as a confused non-technical user while also validating wine suggestions from a domain expert perspective.
Requires `@playwright/mcp` (see MCP Servers section above).

---

## Getting started

Once inside the environment (DevPod or manual), initialize the project with openspec:

```bash
openspec init
```

Or explore starting from a project description:

```bash
openspec opsx-explore "AiSommelier is a web application that helps me choose the right wine based on the meal I'm about to have"
```
