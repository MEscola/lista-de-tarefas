import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";

export default function AtualizarTarefas() {
  const router = useRouter();

  const { data: tarefas, refetch } = trpc.listarTarefas.useQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  const handleAtualizarTarefa = (
    id: string,
    e: React.FormEvent<HTMLFormElement>,
    titulo: string,
    descricao: string
  ) => {
    e.preventDefault();
    if (titulo === null) {  
      alert("O Título é obrigatório");
      return;
    }

    atualizarTarefaMutation.mutate({
      id,
      titulo: titulo,
      descricao: descricao || undefined,
    });
  };

  const handlerDeletarTarefa = (id: string) => {
    if (!confirm("Tem certeza que deseja deletar essa tarefa?")) {
      return;
    }
    deletarTarefaMutation.mutate({ id });
  };

  const handleVoltar = () => {
    router.push("/");
  };

  const handleListarTarefas = () => {
    router.push("/listar-tarefas");
  };


  return (
    <div>
      <h1>Atualizar Tarefas</h1>
      <ul>
        {tarefas?.length === 0 ? (
          <p>Não há tarefas cadastradas.</p>
        ) : (
          tarefas?.map((tarefa) => {
            const [titulo, setTitulo] = useState(tarefa.titulo);
            const [descricao, setDescricao] = useState(tarefa.descricao || "");

            return (
              <div key={tarefa.id}>
                <form
                  onSubmit={(e) =>
                    handleAtualizarTarefa(tarefa.id, e, titulo, descricao)
                  }
                >
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
                  <label>
                    Descrição:
                    <input
                      type="text"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Digite a descrição da tarefa"
                    />
                  </label>
                  <button type="submit" disabled={!titulo.trim()}>
                    Atualizar
                  </button>
                  <button onClick={() => handlerDeletarTarefa(tarefa.id)}>
                  Deletar
                </button>
                </form>
              </div>
            );
          })
        )}
      </ul>

      <div>
        <button onClick={handleVoltar}>Criar Nova Tarefa</button>
        <button onClick={handleListarTarefas}>Listar tarefas</button>
      </div>
    </div>
  );
}
