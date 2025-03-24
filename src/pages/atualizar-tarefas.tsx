import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import * as HomeStyles from "./styles/HomeStyles";

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
      router.reload();
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
    <HomeStyles.Container>
    <div>
      <HomeStyles.Title>Atualizar Tarefas</HomeStyles.Title>
      <ul>
        {tarefas?.length === 0 ? (
          <p>Não há tarefas cadastradas.</p>
        ) : (
          tarefas?.map((tarefa) => {
            const [titulo, setTitulo] = useState(tarefa.titulo);
            const [descricao, setDescricao] = useState(tarefa.descricao || "");

            return (
              <div key={tarefa.id}>
                <HomeStyles.FormContainer
                  onSubmit={(e) =>
                    handleAtualizarTarefa(tarefa.id, e, titulo, descricao)
                  }
                >
                  <HomeStyles.Label>
                    Título:
                    <HomeStyles.Input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Digite o título da tarefa"
                      required
                    />
                  </HomeStyles.Label>
                  <HomeStyles.Label>
                    Descrição:
                    <HomeStyles.Input
                      type="text"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Digite a descrição da tarefa"
                    />
                  </HomeStyles.Label>
                  <HomeStyles.Button type="submit" disabled={!titulo.trim()}>
                    Atualizar
                  </HomeStyles.Button>
                  <HomeStyles.Button onClick={() => handlerDeletarTarefa(tarefa.id)}>
                  Deletar
                </HomeStyles.Button>
                </HomeStyles.FormContainer>
              </div>
            );
          })
        )}
      </ul>

      <HomeStyles.ContainerButton>
        <HomeStyles.Button2 onClick={handleVoltar}>Criar Tarefa</HomeStyles.Button2>
        <HomeStyles.Button2 onClick={handleListarTarefas}>Listar tarefa</HomeStyles.Button2>
      </HomeStyles.ContainerButton>
    </div>
    </HomeStyles.Container>
  );
}
