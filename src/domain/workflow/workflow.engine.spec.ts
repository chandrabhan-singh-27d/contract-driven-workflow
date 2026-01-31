import { describe, it, expect } from "vitest";
import { WorkflowEngine } from "./workflow.engine";
import { invoiceWorkflow } from "./workflow.mock";

describe("WorkflowEngine", () => {
  it("allows valid transition with correct role and data", () => {
    const engine = new WorkflowEngine(invoiceWorkflow, "DRAFT");

    const next = engine.transition("SUBMIT", "USER", {
      amount: 100,
      description: "Invoice",
    });

    expect(next).toBe("SUBMITTED");
  });

  it("blocks transition when guard fails", () => {
    const engine = new WorkflowEngine(invoiceWorkflow, "DRAFT");

    expect(() =>
      engine.transition("SUBMIT", "USER", { amount: null })
    ).toThrow();
  });

  it("blocks transition for invalid role", () => {
    const engine = new WorkflowEngine(invoiceWorkflow, "DRAFT");

    expect(() =>
      engine.transition("SUBMIT", "REVIEWER", { amount: 100 })
    ).toThrow();
  });

  it("blocks invalid action from state", () => {
    const engine = new WorkflowEngine(invoiceWorkflow, "DRAFT");

    expect(() =>
      engine.transition("APPROVE", "REVIEWER")
    ).toThrow();
  });
});
