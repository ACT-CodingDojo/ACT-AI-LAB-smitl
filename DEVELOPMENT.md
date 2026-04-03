# Development Setup

## Prerequisites

- A free GitHub account: https://github.com

## Quick setup with DevPod (recommended)

[DevPod](https://devpod.sh) automatically starts a ready-to-use development environment with no manual installation needed.

1. Download and install DevPod: https://devpod.sh/docs/getting-started/install
2. Install VS Code: https://code.visualstudio.com/download
3. Open the project in DevPod:
   ```
   devpod up https://github.com/ACT-CodingDojo/ACT-AI-LAB-smitl.git --ide vscode
   ```
   Alternatively, use the DevPod GUI and paste the repository URL.

DevPod automatically handles:
- Node.js installation
- `openspec` installation (`npm install -g @fission-ai/openspec@latest`)

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

## Getting started

Once inside the environment (DevPod or manual), initialize the project with openspec:

```bash
openspec init
```

Or explore starting from a project description:

```bash
openspec opsx-explore "AiSommelier is a web application that helps me choose the right wine based on the meal I'm about to have"
```
