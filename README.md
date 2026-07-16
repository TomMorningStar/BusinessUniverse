# Business Universe

Браузерная idle/tycoon-игра на React и TypeScript. Базовая игровая цепочка:

```text
деньги → картофельная ферма → картошка → завод чипсов → чипсы → деньги
```

Проект поддерживается через **точечную разработку после завершения базового MVP**, а не по старой последовательности заданий.

## Стек

- Vite;
- React;
- TypeScript в strict-режиме;
- Zustand;
- `localStorage`;
- CSS/CSS Modules;
- ESLint;
- Prettier.

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Используй реальные команды из текущего `package.json`, если их названия отличаются.

## Постоянные инструкции

```text
AGENTS.md
CLAUDE.md
```

## Сохранения

Текущая базовая схема использует ключ:

```text
business-universe-save
```

и версию:

```text
4
```

Любое изменение сохраняемых данных требует проверки обратной совместимости и, при необходимости, миграции.
