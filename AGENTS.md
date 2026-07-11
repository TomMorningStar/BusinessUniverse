# AGENTS.md — Business Universe

## Role

Act as a senior React and TypeScript engineer maintaining an existing browser idle/tycoon game.

The playable baseline is already implemented. Work from the current repository; do not replay the historical MVP task sequence.

## Primary rule

Implement only the user's explicit request.

Do not automatically:
- pick another backlog item;
- redesign unrelated UI;
- migrate libraries;
- rewrite working modules;
- change game balance;
- add a backend, SDK, framework, or dependency;
- perform cleanup outside the requested scope.

## Relevant documentation

Read only what is needed for the task:

1. `docs/PROJECT_STATE.md` — current project status.
2. `docs/BUSINESS_UNIVERSE_SPEC.md` — implemented game behavior and numbers.
3. `docs/ARCHITECTURE.md` — boundaries and data flow.
4. `docs/DECISIONS.md` — durable technical decisions.
5. `docs/REGRESSION_CHECKLIST.md` — affected regression scenarios.
6. `docs/BACKLOG.md` — ideas only, never an automatic task source.

If code and documentation disagree, inspect the implementation, identify which is current, and report the mismatch. Do not silently change behavior merely to match stale documentation.

## Engineering constraints

- Strict TypeScript.
- No unjustified `any`.
- Domain and economy logic stay outside React components.
- Pure rules belong in `src/domain`.
- Mutable state and actions belong in `src/store`.
- Components render state and call actions.
- Resources, buildings, recipes, prices, durations, and capacities remain config-driven.
- Avoid building-specific production branches.
- Persist only serializable state.
- Validate saves before loading.
- Preserve save compatibility or provide an explicit migration.
- Never double-consume inputs or double-deliver outputs.
- Never silently lose warehouse overflow.
- Do not save on every animation frame.
- Guard abnormal delta time.
- Preserve unrelated behavior.

## Work protocol

For non-trivial tasks:

1. Inspect the relevant code.
2. State a short plan.
3. Make the smallest coherent change.
4. Run relevant automated checks.
5. Test affected scenarios when possible.
6. Update only affected documentation.
7. Report actual results and known limitations.
8. Stop.

Typical checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Never invent a successful check.
