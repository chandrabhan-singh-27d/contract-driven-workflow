"use client";

import { WorkflowAction } from "@/domain/workflow/workflow.contract";
import { actionMeta } from "@/domain/workflow/workflow.actionMeta";

interface ActionBarProps {
  actions: WorkflowAction[];
  disabled?: boolean;
  onAction: (action: WorkflowAction) => void;
}

const intentStyles = {
  primary: "bg-black text-white",
  success: "bg-green-600 text-white",
  danger: "bg-red-600 text-white",
};

export function ActionBar({ actions, disabled, onAction }: ActionBarProps) {
  if (actions.length === 0) return null;

  return (
    <div className="flex justify-end gap-2">
      {actions.map(action => {
        const meta = actionMeta[action];

        return (
          <button
            key={action}
            disabled={disabled}
            onClick={() => onAction(action)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium
              ${intentStyles[meta.intent]}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}

