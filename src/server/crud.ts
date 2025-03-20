import {string, z} from "zod";

import { publicProcedure, router } from "../server/trpc";

//simulação do Bd

let tarefa: {
    id: string;
    titulo: string;
    descricao?: string;
    dataCriacao: Date; 
} [] = [];

//listar tarefas
export const tarefasRouter =  router ({
    listarTarefas: publicProcedure.query(() => {
    return tarefa;
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
    tarefa.push(novaTarefa);
    return novaTarefa;
}),

//update
    atualizarTarefa: publicProcedure
.input(
    z.object({
        id: z.string(),
        titulo: z.string().min(1, "O título é obrigatório"),
        descricao: z.string().optional(),
    }),
)
.mutation(({ input }: { input: { titulo: string;  descricao?: string} }) => {
    const tarefaAtualizada = {
        id: crypto.randomUUID(), //gera um id unico
        titulo: input.titulo,
        descricao: input.descricao,
        dataCriacao: new Date(),
    };
    tarefa.push(tarefaAtualizada);
    return tarefaAtualizada;
}),

//delete
    deletarTarefa: publicProcedure
.input(
    z.object({
        id: z.string(),
    }),
)
.mutation(({ input }: { input: { id: string } }) => {
    const tarefaDeletada = tarefa.find((tarefa) => tarefa.id === input.id);
    if (!tarefaDeletada) {
        throw new Error("Tarefa não encontrada");
    }

    tarefa = tarefa.filter((tarefa) => tarefa.id !== input.id);
    return tarefaDeletada;
    
})  
});

export type TarefaRouter = typeof tarefasRouter;
