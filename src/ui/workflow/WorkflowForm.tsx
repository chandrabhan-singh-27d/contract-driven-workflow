"use client";

import { useEffect } from "react";
import { WorkflowState } from "@/domain/workflow/workflow.contract";
import { viewModes } from "@/domain/workflow/workflow.views";
import { useWorkflowForm } from "./useWorkflowForm";
import { ReadOnlyView } from "./ReadOnlyView";
import { useWatch } from "react-hook-form";

interface Props {
  state: WorkflowState;
  data: Record<string, unknown>;
  onDataChange: (data: unknown) => void;
}

export function WorkflowForm({ state, data, onDataChange }: Props) {
  const mode = viewModes[state];

  if (mode === "READ_ONLY") {
    return <ReadOnlyView data={data} />;
  }

  const form = useWorkflowForm(state);
  const { register, control } = form;

  const values = useWatch({ control });

  useEffect(() => {
    onDataChange(values ?? {});
  }, [values, onDataChange]);

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          {...register("amount", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
          {...register("description")}
        />
      </div>
    </form>

  );
}
