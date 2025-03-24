import { use, useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import * as HomeStyles from './styles/HomeStyles';

export default function Home() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const { data: tarefas, refetch } = trpc.listarTarefas.useQuery();
  

   // Criar Tarefa
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
    
    router.push(`/atualizar-tarefas`);
  };
  
  const handleDeletarTarefa = (id: string) => {
    deletarTarefaMutation.mutate({ id });
  };

  const handleListarTarefas = () => {
    router.push("/listar-tarefas");
  };

  return (
    <HomeStyles.Container> {/* Use o Container de HomeStyles */}
      <div>
        <HomeStyles.Title>Criar Tarefas </HomeStyles.Title> {/* Use o Title de HomeStyles */}
        <HomeStyles.FormContainer onSubmit={handleCriarTarefa}>
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
          <br />
          <HomeStyles.Label>
            Descrição (opcional):
            <HomeStyles.Input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição da tarefa"
            />
          </HomeStyles.Label>
          <br />
          <HomeStyles.Button type="submit">Criar Tarefa</HomeStyles.Button> {/* Use o Button de HomeStyles */}
          <HomeStyles.Button onClick={handleListarTarefas}>Listar Tarefa</HomeStyles.Button>
          <HomeStyles.Button onClick={handleAtualizarTarefa}>Atualizar Tarefas</HomeStyles.Button> {/* Use o Button de HomeStyles */}

      
        </HomeStyles.FormContainer>

      </div>
    </HomeStyles.Container>
  );
}
