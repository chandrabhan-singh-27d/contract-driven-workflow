import { WorkflowState } from "@/domain/workflow/workflow.contract";

const stateStyles: Record<WorkflowState, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  SUBMITTED: "bg-blue-100 text-blue-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export function WorkflowStateBadge({ state }: { state: WorkflowState }) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-1 rounded-full
        text-xs font-medium ${stateStyles[state]}
      `}
    >
      {state}
    </span>
  );
}
