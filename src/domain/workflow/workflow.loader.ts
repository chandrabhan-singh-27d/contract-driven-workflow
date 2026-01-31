import { workflowSchemaSchema } from "./workflow.schema";
import { WorkflowEngine } from "./workflow.engine";
import { WorkflowSchema } from "./workflow.contract";
import { fetchJson } from "@/lib/fetcher";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  // Server-side
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function loadWorkflowEngine() {
  const baseUrl = getBaseUrl();
  const data = await fetchJson<unknown>(`${baseUrl}/api/workflow`);

  const parsed = workflowSchemaSchema.parse(data);
  const schema: WorkflowSchema = parsed;

  return new WorkflowEngine(schema, schema.initialState);
}
