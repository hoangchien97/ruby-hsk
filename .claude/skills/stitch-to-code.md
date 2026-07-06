# Skill: Stitch → Code

## Purpose
Turn a Stitch design (Vibrant Academic Ivory) into Next.js/Tailwind/SCSS code.

## When to use
- When you need to compare against or implement a screen per the Stitch design.

## Reference sources
- Prefer MCP Stitch (`mcp__stitch__*`) if connected (`claude mcp get stitch` → `✔ Connected`).
- If the MCP is still erroring (`tools fetch failed`), use the static export at `Stitch_Ruby_HSK_HTML/<screen>_<breakpoint>_light/code.html` + `screen.png`.
- **Only use the `vibrant_academic_ivory` variant** (`Stitch_Ruby_HSK_HTML/vibrant_academic_ivory/`) — this is the only variant present in the repo; the earlier `ruby_hsk_scholar` variant was removed and must not be used or recreated.

## Steps
1. Identify the screen to convert → find the matching export folder (e.g. `home_page_desktop_light`, `home_page_mobile_light`).
2. Read `code.html` to get the real structure/tokens (color, spacing, radius, typography), cross-checking against the `vibrant_academic_ivory` reference.
3. Map the screen → Next.js route (see the mapping table in `docs/design/00-stitch-design-integration-plan.md`).
4. Identify which parts are reusable components (header, card, button, ...) — implement the component first (`implement-component.md`).
5. Implement the page-specific content next, reusing the component just built/already available.
6. Validate responsiveness against the breakpoints shown in `screen.png` (desktop/mobile) — if a tablet breakpoint is missing, infer it from the `spacing`/`rounded` tokens.

## Rules
- Never copy-paste raw Stitch `code.html` into JSX — always convert it into a React/Tailwind component matching the project's conventions.
- Keep the existing architecture (App Router, `src/components` convention) — never create a parallel structure.
- Keep the Vibrant Academic Ivory spirit: warm, academic, never dashboard-like.

## Output
- Component/page code matching the design + a diff note (if any) added to `docs/design/00-stitch-design-integration-plan.md`.
