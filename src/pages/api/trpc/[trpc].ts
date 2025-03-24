import { createNextApiHandler } from "@trpc/server/adapters/next";
import { tarefaRouter } from "../../../server/routers/crud";
import * as trpcNext from "@trpc/server/adapters/next";

// Cria o handler do tRPC
export default trpcNext.createNextApiHandler({
  router: tarefaRouter,
  createContext: () => ({}),
});
