import { trpc } from "../utils/trpc";
import { GetServerSideProps } from "next";

type Task = {
    id: string;
    titulo: string;
    descricao?: string;
    dataCriacao: Date;
};

type Props = {
    initialTasks: Task[];
};

export default function Home({ initialTasks }: Props) {
    const utils = trpc.useContext();

  // Carregar tarefas do backend
    const { data: tasks = initialTasks, refetch } = trpc.listarTarefas.useQuery(
    undefined,
    {
        initialData: initialTasks.map(task => ({ ...task, dataCriacao: task.dataCriacao.toISOString() })),
    }
    );

  // deletar tarefas
    const deleteTask = trpc.deletarTarefa.useMutation({
    onSuccess: () => {
        alert("Tarefa deletada com sucesso!");
      refetch(); // Atualiza a lista após a exclusão
    },
    onError: (error) => {
        alert(`Erro ao deletar: ${error.message}`);
    },
    });

    return (
    <div>
        <h1>📋 Lista de Tarefas</h1>
        {tasks.length === 0 ? (
        <p>Sem tarefas no momento. 🎉</p>
        ) : (
        <ul>
            {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.titulo}</strong> -{" "}
              {task.descricao || "Sem descrição"}
              <button
                onClick={() => deleteTask.mutate({ id: task.id })}
                disabled={deleteTask.isLoading}
              >
                {deleteTask.isLoading ? "Excluindo..." : "Excluir"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Função SSR para pré-carregar as tarefas
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/trpc/list");
  const data = await response.json();
  return {
    props: {
      initialTasks: data?.result?.data || [],
    },
  };
};
