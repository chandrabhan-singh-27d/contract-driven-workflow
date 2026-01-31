import { z } from "zod";
import { WorkflowState } from "./workflow.contract";

export const draftFormSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
});

export const emptyFormSchema = z.object({});

export const formSchemas: Record<WorkflowState, z.ZodObject<any>> = {
  DRAFT: draftFormSchema,
  SUBMITTED: emptyFormSchema,
  APPROVED: emptyFormSchema,
  REJECTED: emptyFormSchema,
};
