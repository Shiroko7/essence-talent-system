# Essence Talent System

A React + TypeScript + Vite application for managing essence-based talents and abilities.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) v1.3.6
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Netlify

## Getting Started

### Prerequisites

Install Bun:
```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Available Scripts

```bash
# Development server
bun run dev

# Production build (generates essences + changelog, then builds)
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint

# Generate essence files from markdown
bun run generate:essences

# Generate changelog from git history
bun run generate:changelog

# Generate all (essences + changelog)
bun run generate:all
```

## Project Structure

```
essence-talent-system/
├── data/essences/          # Markdown source files for essences
├── scripts/                # Build and data management scripts
├── src/
│   ├── components/
│   │   └── essences/
│   │       └── consts/     # Auto-generated from markdown
│   ├── data/              # JSON data files
│   └── ...
└── ...
```

## Deployment

This project deploys to Netlify using Bun:
- Build command: `bun run build`
- Publish directory: `dist`
- Bun version: 1.3.6
