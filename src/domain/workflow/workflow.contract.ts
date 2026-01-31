import type { components } from "./workflow.openapi";

/**
 * Domain-level aliases.
 * Engine depends on THIS file, never directly on OpenAPI.
 */

export type WorkflowSchema =
  components["schemas"]["WorkflowSchema"];

export type WorkflowTransition =
  components["schemas"]["WorkflowTransition"];

export type Role = "USER" | "REVIEWER" | "ADMIN";
export type WorkflowState = string;
export type WorkflowAction = string;
