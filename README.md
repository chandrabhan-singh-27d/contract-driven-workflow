# Contract-Driven Workflow Engine (Frontend)

This project demonstrates a **contract-driven, state-machine-based workflow system**
built with modern frontend tooling.

The goal is to **separate business workflow logic from UI**, enforce backend ownership,
and make complex operational flows predictable, testable, and evolvable.

---

## How to Use This Project (As a User)

This app represents a **request → review → decision** workflow.

### Typical flow
1. Start as a **Requester**
2. Fill in the required details
3. Click **Submit for review**
4. The request moves to a new state and becomes read-only
5. A **Reviewer** can then approve or reject
6. Once decided, no further action is required

The UI always reflects:
- what step the request is in
- what actions are allowed right now
- whether you are done or waiting on someone else

If no actions are shown, it means **there is nothing you can do at this stage**.

---

## How to Understand This Project (Mental Model)

Think of the system as three layers:

### 1. Workflow Contract (Rules)
Defines:
- possible states
- possible actions
- who can perform them
- when transitions are allowed

This comes from **OpenAPI** and is treated as the source of truth.

---

### 2. Workflow Engine (Interpreter)
- Takes the contract
- Answers questions like:
  - “What actions are available now?”
  - “Can this role perform this action?”
  - “What is the next state?”

This layer has:
- no UI
- no network calls
- no framework dependencies

---

### 3. UI (Projection)
- Reads the engine’s output
- Renders forms, buttons, and messages
- Never contains business rules

If the UI changes, the workflow still behaves the same.  
If the workflow changes, the UI adapts automatically.

---

## How to Extend This Project (Correct Way)

### 1. Change the workflow
Edit the **OpenAPI workflow definition**:
- add states
- add actions
- change permissions
- add or remove transitions

Then regenerate types:
```bash
pnpm gen:workflow
```

---

### 2. Add or modify validations
Update:
- Zod schemas (for runtime validation)
- Guards (for transition conditions)

This controls when actions become available, not how the UI looks.

---

### 3. Add new workflows
You can support multiple workflows by:
- loading different contracts
- instantiating separate engines
- reusing the same UI components

The system is designed to scale horizontally.

---

### 4. Add real backend integration
Replace mock API routes with real endpoints.
The store already supports async transitions safely.

---

## What to Change vs What Not to Change

### Safe to change
- OpenAPI workflow definitions
- Zod schemas
- Guards
- UI copy and layout
- Styling

### Do NOT change unless you know why
- Workflow engine internals
- Store orchestration logic
- Contract boundaries between layers
- Those are intentionally strict.

---

### How to Read the Codebase

## Recommended order:
- openapi/workflow.yaml – the rules
- workflow.contract.ts – domain types
- workflow.engine.ts – core logic
- workflow.store.ts – orchestration
- UI components – projection only

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
