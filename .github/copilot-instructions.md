# Copilot Instructions for AI Agents

## Project Overview
This is a starter fullstack project intended for React (frontend) and Node.js (backend) development. The current state is a minimal scaffold, with only a `package.json` present. The project is expected to evolve into a typical fullstack monorepo or multi-app structure.

## Key Conventions & Structure
- **Monorepo/Fullstack Pattern**: Organize frontend and backend code in separate directories (e.g., `/client` for React, `/server` for Node.js) as the project grows.
- **Scripts**: All developer workflows (build, test, start) should be defined in `package.json` scripts. Add new scripts as you introduce new tooling or frameworks.
- **Dependencies**: Use `npm` for both backend and frontend. Keep dependencies separated by context (backend/frontend) if split.
- **Configuration**: Place shared configuration (e.g., lint, prettier, environment) at the root, but use subdirectory configs for app-specific needs.

## Getting Started
- Install dependencies: `npm install`
- Add frontend/backend apps as subfolders when needed.
- Update `package.json` scripts to reflect new workflows (e.g., `start:client`, `start:server`).

## Patterns & Examples
- **Adding a React frontend**: Create a `/frontend` folder, scaffold with `npx create-react-app client`, and add scripts like `start:client`.
- **Adding a Node backend**: Create a `/server` folder, scaffold with `npm init` or a framework CLI, and add scripts like `start:server`.
- **Testing**: Replace the placeholder `test` script with real test runners (e.g., Jest, Mocha) as needed.

## Integration Points
- No cross-component communication is present yet. When adding, document API endpoints, shared types, and integration contracts in a `/docs` or `/api` folder.

## Project-Specific Notes
- No custom conventions or nonstandard patterns are present yet. Follow standard React/Node.js best practices until project-specific rules emerge.

---
_This file should be updated as the project structure and conventions evolve. Reference this file for onboarding AI agents and developers to project-specific workflows and patterns._
