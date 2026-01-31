import { NextResponse } from "next/server";

export type Role = "USER" | "REVIEWER" | "ADMIN";

export interface WorkflowTransition {
  from: string;
  to: string;
  action: string;
  allowedRoles: Role[];
  guard?: string;
}

export interface WorkflowSchema {
  id: string;
  initialState: string;
  states: string[];
  transitions: WorkflowTransition[];
}

const workflowSchema: WorkflowSchema = {
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

export async function GET() {
  return NextResponse.json(workflowSchema);
}
