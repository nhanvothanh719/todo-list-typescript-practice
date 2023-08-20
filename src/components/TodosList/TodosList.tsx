import { useState } from 'react'
import TaskInput from '../TaskInput'
import TasksList from '../TasksList'
import styles from './TodosList.module.scss'
import { Task } from '../../@types/task.type'

const TodosList = () => {
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)

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

  const selectTask = (id: string) => {
    const task = tasksList.find((task) => task.id === id)
    if (task) setCurrentTask(task)
  }

  const editTask = (updatedName: string) => {
    setCurrentTask((prevTask) => {
      if (prevTask) return { ...prevTask, name: updatedName }
      return null
    })
  }

  const saveUpdatedTask = () => {
    setTasksList((prevTasksList) => {
      return prevTasksList.map((task) => {
        if (task.id === currentTask?.id) return currentTask
        return task
      })
    })
    setCurrentTask(null)
  }

  const deleteTask = (id: string) => {
    if (currentTask) setCurrentTask(null)

    setTasksList((prevTasksList) => {
      const taskIndex = prevTasksList.findIndex((task) => task.id === id)

      if (taskIndex > -1) {
        const updatedTasksList = [...prevTasksList]
        updatedTasksList.splice(taskIndex, 1)
        return updatedTasksList
      }
      return prevTasksList
    })
  }

  return (
    <div className={styles.container}>
      <TaskInput addTask={addTask} currentTask={currentTask} editTask={editTask} saveUpdatedTask={saveUpdatedTask} />
      <TasksList
        isDoneTasksList={false}
        tasksList={todoTasks}
        changeTaskStatus={changeTasksStatus}
        selectTask={selectTask}
        deleteTask={deleteTask}
      />
      <TasksList
        isDoneTasksList={true}
        tasksList={doneTasks}
        changeTaskStatus={changeTasksStatus}
        selectTask={selectTask}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default TodosList
