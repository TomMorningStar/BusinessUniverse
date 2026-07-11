# Backlog — Business Universe

This file contains possible future work. It is not a task queue for the agent.

**Do not implement any item from this file unless the user explicitly requests it.**

## Candidate: Yandex Games integration

Possible scope:
- SDK initialization;
- readiness signal;
- iframe-safe lifecycle;
- player identity;
- cloud save adapter;
- local fallback;
- interstitial ads;
- rewarded ads;
- leaderboards;
- language/platform environment;
- platform pause/resume behavior.

Before implementation, define:
- exact SDK version and initialization flow;
- failure and no-SDK fallback;
- cloud/local conflict strategy;
- anonymous player behavior;
- save migration and size limits;
- ad placement and reward rules.

## Candidate: building upgrades

Possible scope:
- building levels;
- upgrade prices;
- output growth;
- duration reduction;
- unlock conditions.

Required before implementation:
- explicit formulas;
- rounding rules;
- maximum levels;
- save-schema impact;
- UI acceptance scenarios.

## Candidate: warehouse progression

Possible scope:
- resource-specific capacity upgrades;
- global warehouse upgrades;
- unlock conditions.

Required before implementation:
- costs;
- capacity formulas;
- full-output behavior during upgrade;
- save impact.

## Candidate: offline progress

Required decisions:
- maximum offline duration;
- clock-tampering handling;
- input consumption;
- output capacity;
- auto-sell;
- production transition limits;
- save timestamps;
- welcome-back report.

Offline progress must reuse deterministic production rules.

## Candidate: new production chains

Examples:

```text
wheat → flour → bread
milk → cheese → pizza
wood → boards → furniture
ore → metal → devices
```

Requirements:
- config-driven entities;
- generic production remains valid;
- explicit balance;
- save migration where needed;
- regression coverage.

## Candidate: meta progression

Possible systems:
- achievements;
- missions;
- managers;
- research;
- statistics;
- prestige/rebirth;
- daily rewards.

Every system needs:
- explicit formulas;
- reset behavior;
- save impact;
- abuse considerations;
- acceptance scenarios.

## Candidate: presentation polish

Possible scope:
- original SVG assets;
- subtle production animation;
- sounds and mute control;
- themes;
- onboarding;
- feedback and notices;
- analytics events.

Requirements:
- accessible controls;
- reduced-motion support;
- mobile performance;
- no logic dependency on animation.

## Confirmed future task

None. Add an item here only after the user chooses it, or create `docs/CURRENT_TASK.md` from the task template while it is being implemented.
