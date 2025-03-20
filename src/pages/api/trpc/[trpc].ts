import { createNextApiHandler } from "@trpc/server/adapters/next";
import { tarefasRouter } from "../../../server/crud"; // Importa as rotas das tarefas




export default createNextApiHandler({
  router: tarefasRouter, // Define o roteador de tarefas
    createContext: () => ({}),
});

