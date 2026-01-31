import { WorkflowState } from "./workflow.contract";

export type ViewMode = "EDIT" | "READ_ONLY";

export const viewModes: Record<WorkflowState, ViewMode> = {
  DRAFT: "EDIT",
  SUBMITTED: "READ_ONLY",
  APPROVED: "READ_ONLY",
  REJECTED: "READ_ONLY",
};
