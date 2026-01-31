import { WorkflowAction } from "./workflow.contract";

export type ActionIntent = "primary" | "success" | "danger";

export const actionMeta: Record<
  WorkflowAction,
  { label: string; intent: ActionIntent }
> = {
  SUBMIT: { label: "Submit", intent: "primary" },
  APPROVE: { label: "Approve", intent: "success" },
  REJECT: { label: "Reject", intent: "danger" },
};
