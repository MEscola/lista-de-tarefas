import { z} from "zod";

import { publicProcedure, router } from "@/server/trpc";
import { TRACE_OUTPUT_VERSION } from "next/dist/shared/lib/constants";

//simulação do Bd

let tarefas: {
    id: string;
    titulo: string;
    descricao?: string;
    dataCriacao: Date; 
} [] = [];

//listar tarefas
export const tarefaRouter =  router ({
    listarTarefas: publicProcedure.query(() => {
        try {
            return tarefas;
        } catch (error) {
            console.error("Erro ao listar tarefas:", error);
            return [];
        }
        }),
//create

criarTarefa: publicProcedure
    .input(
        z.object({
            titulo: z.string().min(1, "O título é obrigatório"),
            descricao: z.string().optional(),
    }),
)
.mutation(({ input }: { input: { titulo: string; descricao?: string } }) => {
    const novaTarefa = {
        id: crypto.randomUUID(), //gera um id unico
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: new Date(),
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
}),

//update
atualizarTarefa: publicProcedure
.input(
z.object({
    id: z.string(),
    titulo: z.string().min(1, "O título é obrigatório"),
    descricao: z.string().optional(),
}),
)
.mutation(({ input }) => {
const tarefaIndex = tarefas.findIndex((tarefa) => tarefa.id === input.id);
    if (tarefaIndex === -1) {
    throw new Error("Tarefa não encontrada");
}

tarefas[tarefaIndex] = {
    ...tarefas[tarefaIndex],
    titulo: input.titulo,
    descricao: input.descricao,
};

    return tarefas[tarefaIndex];
}),

//delete
    deletarTarefa: publicProcedure
.input(
    z.object({
        id: z.string(),
    }),
)
.mutation(({ input }: { input: { id: string } }) => {
    const tarefaDeletada = tarefas.find((tarefa) => tarefa.id === input.id);
    if (!tarefaDeletada) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas = tarefas.filter((tarefa) => tarefa.id !== input.id);
    return { message: "Tarefa deletada com sucesso", id: input.id };
    
})  
});

export type TarefaRouter = typeof tarefaRouter;
