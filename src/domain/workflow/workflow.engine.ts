import {
  WorkflowSchema,
  WorkflowState,
  WorkflowAction,
  Role,
} from "./workflow.contract";
import { guards } from "./workflow.guards";

export class WorkflowEngine {
  constructor(
    private readonly schema: WorkflowSchema,
    private readonly state: WorkflowState
  ) { }

  getState(): WorkflowState {
    return this.state;
  }

  getSchema(): WorkflowSchema {
    return this.schema;
  }

  canPerform(
    action: WorkflowAction,
    role: Role,
    data?: unknown
  ): boolean {
    const transition = this.schema.transitions.find(
      t => t.from === this.state && t.action === action
    );

    if (!transition) return false;
    if (!transition.allowedRoles.includes(role)) return false;

    if (transition.guard) {
      const guardFn = guards[transition.guard];
      if (!guardFn) return false;
      return guardFn({ data, role });
    }

    return true;
  }

  transition(
    action: WorkflowAction,
    role: Role,
    data?: unknown
  ): WorkflowEngine {
    if (!this.canPerform(action, role, data)) {
      throw new Error("Invalid workflow transition");
    }

    const transition = this.schema.transitions.find(
      t => t.from === this.state && t.action === action
    )!;

    return new WorkflowEngine(this.schema, transition.to);
  }

  getAvailableActions(
    role: Role,
    data?: unknown
  ): WorkflowAction[] {
    return this.schema.transitions
      .filter(t => t.from === this.state)
      .filter(t => t.allowedRoles.includes(role))
      .filter(t => {
        if (!t.guard) return true;
        const guardFn = guards[t.guard];
        if (!guardFn) return false;
        return guardFn({ role, data });
      })
      .map(t => t.action);
  }

}
