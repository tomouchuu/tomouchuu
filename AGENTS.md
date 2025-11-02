# Agent Guide
- Use Bun; install deps with `bun install`.
- Run dev server via `bun run dev` (Vite).
- Build site artifacts using `bun run build`.
- Static analysis lives in `bun run check`; watch with `bun run check:watch`.
- Run the full Vitest suite via `bun run test` (non-watch).
- Target a spec with `bun run test:unit -- path/to/spec.ts`; add `-t "case"` to isolate a test.
- Vitest runs browser (Playwright Chromium) and node projects; ensure Chromium is available.
- Follow EditorConfig defaults: LF endings, UTF-8, two-space indents, trailing newline.
- Prefer TypeScript everywhere and keep `strict` mode clean.
- Reach for `import type` for types; order imports external → `$lib` aliases → relatives.
- Svelte 5 runes are in use; rely on `$props()`, `$state`, etc., not legacy bind helpers.
- Components sit in folders with `index.svelte`; name components in PascalCase.
- Prefer double quotes for strings; reserve template literals for interpolation and i18n helpers (`m.*`).
- Compose class names with `cn`, `clsx`, or Tailwind utilities instead of manual concatenation.
- Tailwind is the primary styling tool; base UI extends shadcn-svelte components.
- Use Elysia body validators and throw typed errors (or SvelteKit `error()`) for API/server failures.
- Guard environment variable access and document required keys near usage.
- Tests should mock network boundaries with `vi.mock` and assert via required assertions.
- Keep exports named and surface public APIs through `index.ts` barrels.
- Update docs and types alongside behavior changes; avoid sneaking in unrelated refactors.

--

In addition you are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned. Do NOT use this tool, for the shadcn-svelte components found in src/lib/components/ui/*.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
