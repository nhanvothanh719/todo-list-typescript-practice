import { useState } from 'react'
import TaskInput from '../TaskInput'
import TasksList from '../TasksList'
import styles from './TodosList.module.scss'
import { Task } from '../../@types/task.type'

const TodosList = () => {
  
  const [tasksList, setTasksList] = useState <Task[]>([]);

  const todoTasks = tasksList.filter((task) => task.isDone === false)
  const doneTasks = tasksList.filter((task) => task.isDone === true)

  return (
    <div className={styles.container}>
      <TaskInput />
      <TasksList isDoneTasksList={false} />
      <TasksList isDoneTasksList={true} />
    </div>
  )
}

export default TodosList
