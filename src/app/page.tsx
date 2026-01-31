"use client";

import { useEffect, useState } from "react";
import { useWorkflowStore } from "@/store/workflow.store";
import { ActionBar } from "@/ui/workflow/ActionBar";
import { WorkflowForm } from "@/ui/workflow/WorkflowForm";
import { WorkflowStateBadge } from "@/ui/workflow/WorkflowStateBadge";
import { WorkflowTimeline } from "@/ui/workflow/WorkflowTimeline";
import { Role } from "@/domain/workflow/workflow.contract";

const role: Role = "USER";

export default function Home() {
  const {
    init,
    state,
    getActions,
    perform,
    busy,
    history,
  } = useWorkflowStore();

  const [formData, setFormData] = useState<unknown>({});

  useEffect(() => {
    init();
  }, [init]);

  if (!state) return <div>Loading…</div>;

  const actions = getActions(role, formData);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-sm border p-6 space-y-6">
        {/* Busy overlay */}
        {busy && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl z-10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
          </div>
        )}

        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Workflow</h1>
            <WorkflowStateBadge state={state} />
          </div>
          <p className="text-sm text-gray-500">
            Current state: <span className="font-medium">{state}</span>
          </p>
        </div>

        {/* Form / Read-only view */}
        <WorkflowForm
          state={state}
          data={formData as Record<string, unknown>}
          onDataChange={setFormData}
        />

        {/* Actions */}
        <ActionBar
          actions={actions}
          disabled={busy}
          onAction={(action) => perform(action, role, formData)}
        />

        {/* Timeline */}
        <WorkflowTimeline history={history} />
      </div>
    </div>
  );
}
