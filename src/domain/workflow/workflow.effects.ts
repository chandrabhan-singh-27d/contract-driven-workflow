import { WorkflowAction } from "./workflow.contract";

export type WorkflowEffect = (data?: unknown) => Promise<void>;

export const workflowEffects: Record<WorkflowAction, WorkflowEffect> = {
  SUBMIT: async (data) => {
    await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  APPROVE: async () => {
    await fetch("/api/approve", { method: "POST" });
  },

  REJECT: async () => {
    await fetch("/api/reject", { method: "POST" });
  },
};
