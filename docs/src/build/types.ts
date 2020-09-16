export type NodeInput<T> = Omit<T, "id" | "parent" | "children" | "internal">;
