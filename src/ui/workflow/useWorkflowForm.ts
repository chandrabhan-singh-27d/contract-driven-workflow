"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject } from "zod";
import { formSchemas } from "@/domain/workflow/workflow.forms";
import { WorkflowState } from "@/domain/workflow/workflow.contract";

export function useWorkflowForm(state: WorkflowState) {
  const schema: ZodObject<any> | undefined = formSchemas[state];

  return useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onChange",
  });
}
