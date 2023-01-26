import { Trash } from 'phosphor-react'
import { ChangeEvent } from 'react';
import styles from './NewTask.module.css'

interface NewTasks {
    id: Number;
    title: string;
    isComplete: (id: Number, task: string) => void;
    onDeleteTask: (task: string) => void;
}

export function NewTask({id, title, isComplete, onDeleteTask }: NewTasks) {
    function handleDeleteTask() {
        onDeleteTask(title)
    }

    function handleCheckTask() {
        console.log(id, title)
        isComplete( id, title )
    }

    return (
        <main className={styles.newTasks}>
            <label >
                <input type="checkbox" onClick={handleCheckTask} className={styles.checkbox} />
                <span></span>
                <p>{title}</p>
            </label>
            <button onClick={handleDeleteTask} title="Deletar tarefa">
                <Trash weight='bold' size={18} />
            </button>
        </main>
    )
}