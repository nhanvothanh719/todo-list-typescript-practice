import { useState } from 'react'
import TaskInput from '../TaskInput'
import TasksList from '../TasksList'
import styles from './TodosList.module.scss'
import { Task } from '../../@types/task.type'

const TodosList = () => {
  const [tasksList, setTasksList] = useState<Task[]>([])

  const todoTasks = tasksList.filter((task) => task.isDone === false)
  const doneTasks = tasksList.filter((task) => task.isDone === true)

  const addTask = (name: string) => {
    const task: Task = {
      id: new Date().toISOString(),
      name,
      isDone: false
    }

    setTasksList((prevTasksList) => [...prevTasksList, task])
  }

  const changeTasksStatus = (id: string, isDone: boolean) => {
    setTasksList((prevTasksList) => {
      return prevTasksList.map((task) => {
        if (task.id === id) {
          return { ...task, isDone }
        }
        return task
      })
    })
  }

  return (
    <div className={styles.container}>
      <TaskInput addTask={addTask} />
      <TasksList isDoneTasksList={false} tasksList={todoTasks} changeTaskStatus={changeTasksStatus} />
      <TasksList isDoneTasksList={true} tasksList={doneTasks} changeTaskStatus={changeTasksStatus} />
    </div>
  )
}

export default TodosList
