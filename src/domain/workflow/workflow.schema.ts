import { z } from "zod";

export const roleSchema = z.enum(["USER", "REVIEWER", "ADMIN"]);

export const workflowTransitionSchema = z.object({
  from: z.string(),
  to: z.string(),
  action: z.string(),
  allowedRoles: z.array(roleSchema),
  guard: z.string().optional(),
});

export const workflowSchemaSchema = z.object({
  id: z.string(),
  initialState: z.string(),
  states: z.array(z.string()),
  transitions: z.array(workflowTransitionSchema),
});

export type WorkflowSchemaDTO = z.infer<typeof workflowSchemaSchema>;
