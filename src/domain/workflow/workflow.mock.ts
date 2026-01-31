import { WorkflowSchema } from "./workflow.contract";

export const invoiceWorkflow: WorkflowSchema = {
  id: "invoice-workflow",
  initialState: "DRAFT",
  states: ["DRAFT", "SUBMITTED", "APPROVED", "REJECTED"],
  transitions: [
    {
      from: "DRAFT",
      to: "SUBMITTED",
      action: "SUBMIT",
      allowedRoles: ["USER"],
      guard: "isFormValid",
    },
    {
      from: "SUBMITTED",
      to: "APPROVED",
      action: "APPROVE",
      allowedRoles: ["REVIEWER"],
    },
    {
      from: "SUBMITTED",
      to: "REJECTED",
      action: "REJECT",
      allowedRoles: ["REVIEWER"],
    },
  ],
};
