# Contract-Driven Workflow Engine (Frontend)

This project demonstrates a **contract-driven, state-machine-based workflow system**
built with modern frontend tooling.

The goal is to **separate business workflow logic from UI**, enforce backend ownership,
and make complex operational flows predictable, testable, and evolvable.

---

## Core Principles

### 1. Backend (BFF) Owns the Workflow
- Workflow steps
- State transitions
- Permissions
- Guards

Frontend consumes the workflow as **data**, not code.

---

### 2. Workflow Is a Pure State Machine
- No React
- No Zustand
- No side effects

If logic cannot be tested without the UI, it does not belong here.

---

### 3. UI Is Dumb
UI renders:
- Current state
- Available actions
- Validation errors

UI never decides:
- What action is allowed
- Whether a transition is valid
- Who can do what

---

## Tech Stack

- **Next.js (App Router)** – Application shell
- **TypeScript** – Strong contracts
- **Vitest** – Fast, deterministic tests
- **Zod** – Schema-driven validation
- **React Hook Form** – Form orchestration
- **Zustand** – Thin state wrapper
- **Tailwind CSS** – Styling (irrelevant to logic)

---

## Folder Structure (Why It Matters)
app/
├── api/
│   └── workflow/          # Mock BFF – workflow contract source
│
domain/
└── workflow/              # Pure business logic (state machine)
    ├── workflow.contract.ts
    ├── workflow.engine.ts
    ├── workflow.guards.ts
    ├── workflow.mock.ts
    └── workflow.engine.spec.ts
│
store/
└── workflow.store.ts      # Thin orchestration layer (Zustand)
│
ui/
└── workflow/              # Dumb rendering components
    ├── WorkflowRenderer.tsx
    └── ActionBar.tsx
│
lib/
└── fetcher.ts             # Shared infra helpers (no business rules)
│
styles/
└── globals.css
│
tests/
└── setup.ts
