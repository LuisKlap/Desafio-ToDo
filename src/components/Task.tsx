import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { EmptyTask } from "./EmptyTask";
import { NewTask } from "./NewTask";
import styles from "./Task.module.css";

interface TasksComplete {
  id: number;
  title: string;
  complete: boolean;
}

export function Task() {
  const [tasks, setTasks] = useState(["Estudar para ser FullStack"]);
  const [newTasks, setNewTasks] = useState("");
  const [countComplete, setCountComplete] = useState([
    {
      id: 0,
      title: "",
    },
  ]);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTasks]);
    setNewTasks("");
    console.log(newTasks);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTasks(event.target.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function taskIsComplete(idTask: Number, taskToComplete: string) {
    const task = {
      id: idTask as number,
      title: taskToComplete,
    };

    setCountComplete([...countComplete, task]);
  }

  function taskNotComplete(idTask: Number, taskToComplete: string) {
    const task = {
      id: idTask as number,
      title: taskToComplete,
    };

    const taskNotCompleted = countComplete.filter((taskIsntComplete) => {
      return taskIsntComplete !== task;
    });

    setCountComplete(taskNotCompleted);
  }

  function deleteTask(taskToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task !== taskToDelete;
    });

    setTasks(taskWithoutDeletedOne);
  }

  const isNewTaskEmpty = newTasks.length === 0;
  return (
    <article className={styles.tasks}>
      <form
        onSubmit={handleCreateNewTask}
        className={styles.form}
        autoComplete="off"
      >
        <input
          name="tarefa"
          placeholder="Adicione uma nova tarefa"
          value={newTasks}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
        />

        <button type="submit" disabled={isNewTaskEmpty}>
          <strong>Criar</strong> <PlusCircle size={20} weight="bold" />
        </button>
      </form>

      <div className={styles.score}>
        <div className={styles.created}>
          <strong>Tarefas criadas</strong>{" "}
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <div className={styles.status}>
          <strong> Concluídas</strong>
          <span className={styles.count}>
            {countComplete.length} de {tasks.length}
          </span>
        </div>
      </div>

      <div className={styles.taskIsComing}>
        {tasks.map((task) => {
          return (
            <NewTask
              key={task}
              id={Math.random()}
              title={task}
              onDeleteTask={deleteTask}
              isComplete={taskIsComplete || taskNotComplete}
            />
          );
        })}
      </div>
    </article>
  );
}
