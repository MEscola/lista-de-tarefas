import { createTRPCReact } from "@trpc/react-query";
import type { TarefaRouter } from "../server/routers/crud"; // Ajuste o caminho conforme necessário

export const trpc = createTRPCReact<TarefaRouter>({
    
});
