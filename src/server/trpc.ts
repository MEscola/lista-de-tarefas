import {initTRPC} from "@trpc/server";

const t = initTRPC.create(); //Inicializa o trpc

export const router = t.router; //criar rotas
export const publicProcedure = t.procedure;