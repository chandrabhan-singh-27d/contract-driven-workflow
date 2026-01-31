export interface GuardContext {
  data?: unknown;
  role: string;
}

export type GuardFn = (ctx: GuardContext) => boolean;

export const guards: Record<string, GuardFn> = {
  isFormValid: ({ data }) => {
    if (!data || typeof data !== "object") return false;
    return Object.values(data as Record<string, unknown>).every(Boolean);
  },
};
