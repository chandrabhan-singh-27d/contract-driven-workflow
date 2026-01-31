import { create } from "zustand";
import { WorkflowEngine } from "@/domain/workflow/workflow.engine";
import {
  WorkflowAction,
  WorkflowState,
  Role,
} from "@/domain/workflow/workflow.contract";
import { loadWorkflowEngine } from "@/domain/workflow/workflow.loader";
import { workflowEffects } from "@/domain/workflow/workflow.effects";

interface WorkflowStore {
  engine: WorkflowEngine | null;
  state: WorkflowState | null;
  busy: boolean;
  history: WorkflowState[];

  init: () => Promise<void>;

  canPerform: (
    action: WorkflowAction,
    role: Role,
    data?: unknown
  ) => boolean;

  getActions: (
    role: Role,
    data?: unknown
  ) => WorkflowAction[];

  perform: (
    action: WorkflowAction,
    role: Role,
    data?: unknown
  ) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  engine: null,
  state: null,
  busy: false,
  history: [],

  async init() {
    const engine = await loadWorkflowEngine();
    const initialState = engine.getState();

    set({
      engine,
      state: initialState,
      history: [initialState],
    });
  },

  canPerform(action, role, data) {
    const { engine, busy } = get();
    if (!engine || busy) return false;
    return engine.canPerform(action, role, data);
  },

  getActions(role, data) {
    const { engine, busy } = get();
    if (!engine || busy) return [];
    return engine.getAvailableActions(role, data);
  },

  async perform(action, role, data) {
    const { engine, history } = get();
    if (!engine) return;

    set({ busy: true });

    try {
      // 1. Side effect first
      const effect = workflowEffects[action];
      if (effect) {
        await effect(data);
      }

      // 2. Transition after success
      const nextEngine = engine.transition(action, role, data);
      const nextState = nextEngine.getState();

      set({
        engine: nextEngine,
        state: nextState,
        history: [...history, nextState],
      });
    } catch (error) {
      console.error("Workflow action failed:", error);
    } finally {
      set({ busy: false });
    }
  },
}));
