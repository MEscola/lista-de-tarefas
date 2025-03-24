import { GetServerSideProps } from "next";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import * as HomeStyles from "./styles/HomeStyles";

// Tipo da tarefa
interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: string;
}

interface ListarTarefasProps {
  tarefas: Tarefa[];
}

export default function ListarTarefas({ tarefas }: ListarTarefasProps) {
  const router = useRouter();

  const deletarTarefaMutation = trpc.deletarTarefa.useMutation({
    onSuccess: () => {
      alert("Tarefa deletada com sucesso!");
      router.reload(); // Força um reload para atualizar a lista de tarefas
    },
    onError: (error) => {
      alert(`Erro ao deletar tarefa: ${error.message}`);
    },
  });
  

  const handlerDeletarTarefa = (id: string) => {
    if (!confirm("Tem certeza que deseja deletar essa tarefa?")) {
      return;
    }
    deletarTarefaMutation.mutate({ id });
  };

  const handleVoltar = () => {
    router.push("/");
  };

  const handleAtualizarTarefa = () => {
    router.push("/atualizar-tarefas");
  };


  return (
    <HomeStyles.Container>
    <div>
      <HomeStyles.Title>Lista de Tarefas</HomeStyles.Title>
      <ul>
        {tarefas?.length === 0 ? (
          <p>Não há tarefas cadastradas.</p>
        ) : (
          tarefas.map((tarefa) => (
            <div key={tarefa.id}>
              <h2>Título: {tarefa.titulo}</h2>
              <p>Descrição: {tarefa.descricao || "Sem descrição"}</p>
              <HomeStyles.Button2 onClick={() => handlerDeletarTarefa(tarefa.id)}>
                Deletar
              </HomeStyles.Button2>
            </div>
          ))
        )}
      </ul>

      <HomeStyles.ContainerButton>
        <HomeStyles.Button onClick={handleVoltar}>Criar Nova Tarefa</HomeStyles.Button>
        <HomeStyles.Button onClick={handleAtualizarTarefa}>Atualizar Tarefa</HomeStyles.Button>
      </HomeStyles.ContainerButton>
    </div>
    </HomeStyles.Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/trpc/listarTarefas");
  
      if (!res.ok) {
        throw new Error("Falha ao buscar dados da API");
      }
  
      const data = await res.json();
      console.log("Resposta completa da API:", JSON.stringify(data, null, 2));
  
      // Acessa corretamente os dados
      const tarefas = data?.result?.data;
  
      if (!Array.isArray(tarefas)) {
        throw new Error("Dados inválidos recebidos da API");
      }
  
      return {
        props: {
          tarefas,
        },
      };
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      return {
        props: {
          tarefas: [],
        },
      };
    }
  };
  