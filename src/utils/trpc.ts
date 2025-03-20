import { createTRPCReact } from "@trpc/react-query";
import type { TarefaRouter } from "../server/crud";

export const trpc = createTRPCReact<TarefaRouter>();