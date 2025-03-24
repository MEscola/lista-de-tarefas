import { use, useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const { data: tarefas, refetch } = trpc.listarTarefas.useQuery();
  

  const criarTarefaMutation = trpc.criarTarefa.useMutation({
    onSuccess: () => {
      alert("Tarefa criada com sucesso!");
      refetch();
    },
    onError: (error) => {
      alert(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  const atualizarTarefaMutation = trpc.atualizarTarefa.useMutation({
    onSuccess: () => {
      alert("Tarefa atualizada com sucesso!");
      refetch();
    },
    onError: (error) => {
      alert(`Erro ao atualizar tarefa: ${error.message}`);
    },
  });

  const deletarTarefaMutation = trpc.deletarTarefa.useMutation({
    onSuccess: () => {
      alert("Tarefa deletada com sucesso!");
      refetch();
    },
    onError: (error) => {
      alert(`Erro ao deletar tarefa: ${error.message}`);
    },
  });

  
  const handleCriarTarefa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titulo === null) {
      alert("O Título é obrigatório");
      return;
    }

    criarTarefaMutation.mutate({
      titulo: titulo,
      descricao: descricao || undefined,
    });
    setTitulo("");
    setDescricao("");
  };

  const handleAtualizarTarefa = () => {
    
    router.push(`/atualizar-tarefas?id`);
  };
  
  const handleDeletarTarefa = (id: string) => {
    deletarTarefaMutation.mutate({ id });
  };

  const handleListarTarefas = () => {
    router.push("/listar-tarefas");
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-pink-800">📋 Criar Tarefas </h1>
      <form onSubmit={handleCriarTarefa}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da tarefa"
            required
          />
    
        </label>
        <br />
        <label>
          Descrição (opcional):
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição da tarefa"
          />
        </label>
        <br />
        <button type="submit" > Criar Tarefa </button>
        <button onClick={handleListarTarefas}> Listar Tarefa </button>
        
        <br />
      
      </form>

      <button onClick={handleAtualizarTarefa}>Atualizar Tarefas</button>
    </>
  );
}
