# Regression Checklist — Business Universe

Use targeted sections after ordinary changes. Run the complete checklist before releases and after major production, store, save, or architecture changes.

Never mark a scenario as tested unless it was actually tested.

## Automated checks

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run format:check`
- [ ] `npm run build`
- [ ] No result was invented or assumed.

## Browser health

- [ ] App opens without a blank screen.
- [ ] Browser console has no errors caused by the change.
- [ ] No warning repeats continuously.
- [ ] No horizontal scroll at 320 px.
- [ ] Changed controls work with mouse and touch.
- [ ] Changed UI remains understandable without relying only on color.

## Initial state

- [ ] Money is exactly 100 ₽.
- [ ] Warehouse is empty.
- [ ] No building is owned.
- [ ] Auto-sell is off for both resources.

## Purchases

- [ ] Farm costs exactly 100 ₽.
- [ ] Buying the farm leaves exactly 0 ₽.
- [ ] The same farm cannot be bought twice.
- [ ] Factory costs exactly 500 ₽.
- [ ] Unaffordable purchases show a reason.
- [ ] Money never becomes negative.

## Farm production

- [ ] Farm cycle takes 5 seconds.
- [ ] Farm produces exactly 5 potatoes.
- [ ] Progress is not FPS-dependent.
- [ ] Full potato storage prevents a new stored-output cycle.
- [ ] No overflow is silently lost.

## Selling

- [ ] One potato sells for 5 ₽.
- [ ] Sell-all removes all stored units.
- [ ] Income is exact.
- [ ] Selling zero units is disabled.
- [ ] Enabling auto-sell does not sell old stock.
- [ ] New auto-sold potatoes add exactly 25 ₽ per farm cycle.

## Factory

- [ ] Factory waits at 0% below 10 potatoes.
- [ ] It consumes exactly 10 potatoes at cycle start.
- [ ] Inputs are not consumed twice.
- [ ] Cycle takes 7 seconds.
- [ ] Output is exactly 2 chips.
- [ ] Two chips sell for exactly 80 ₽.
- [ ] Blocked output does not lose inputs or output.

## Time and visibility

- [ ] Hidden tab pauses baseline progress.
- [ ] Returning does not trigger a huge catch-up.
- [ ] Negative, infinite, or `NaN` delta cannot corrupt state.

## Save and load

- [ ] Storage key is `business-universe-save`.
- [ ] Save contains schema version 1.
- [ ] Refresh preserves money, stock, buildings, auto-sell, and active progress.
- [ ] Refresh during factory production does not charge another 10 potatoes.
- [ ] Corrupted JSON falls back safely.
- [ ] Invalid negative values are rejected or sanitized.
- [ ] Unknown entities do not crash loading.
- [ ] Save is not written every animation frame.
- [ ] An older supported save migrates or loads as documented.

## Reset

- [ ] Reset asks for confirmation.
- [ ] Reset restores exact initial state.
- [ ] Reset clears persisted data.
- [ ] Reload after reset does not restore old progress.

## Architecture

- [ ] React components contain no authoritative production formulas.
- [ ] Resource and building values come from typed configs.
- [ ] No new building-ID production branch was introduced.
- [ ] Domain helpers do not import React.
- [ ] Store actions do not call React hooks.
- [ ] Reset/load fallback uses a fresh initial-state factory.
- [ ] Persisted JSON contains no functions.
- [ ] New `any` usage is absent or explicitly justified.
- [ ] New platform SDK types do not leak into domain types.

## Change-specific report

- [ ] Changed files are listed.
- [ ] Automated checks actually run are listed with real outcomes.
- [ ] Manual scenarios actually tested are listed.
- [ ] Save compatibility is stated.
- [ ] Known limitations and risks are stated honestly.
- [ ] Documentation matches the implemented behavior.
