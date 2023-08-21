import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TasksList from '../TasksList'
import styles from './TodosList.module.scss'
import { Task } from '../../@types/task.type'

type HandleTasks = (tasks: Task[]) => Task[]

const syncDataToLocalStorage = (handleLocalTasks: HandleTasks) => {
  const savedTasksString = localStorage.getItem('tasks')
  const savedTasks: Task[] = JSON.parse(savedTasksString || '[]')

  const newTasksList = handleLocalTasks(savedTasks)
  localStorage.setItem('tasks', JSON.stringify(newTasksList))
}

const TodosList = () => {
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)

  const todoTasks = tasksList.filter((task) => task.isDone === false)
  const doneTasks = tasksList.filter((task) => task.isDone === true)

  useEffect(() => {
    const savedTasksString = localStorage.getItem('tasks')
    const savedTasks = JSON.parse(savedTasksString || '[]')
    setTasksList(savedTasks)
  }, [])

  const addTask = (name: string) => {
    const task: Task = {
      id: new Date().toISOString(),
      name,
      isDone: false
    }

    setTasksList((prevTasksList) => [...prevTasksList, task])

    const addLocalTask: HandleTasks = (tasksList: Task[]) => [...tasksList, task]

    syncDataToLocalStorage(addLocalTask)
  }

  const changeTasksStatus = (id: string, isDone: boolean) => {
    const updateTaskStatus: HandleTasks = (tasks: Task[]) =>
      [...tasks].map((task) => {
        if (task.id === id) return { ...task, isDone }
        return task
      })

    setTasksList((prevTasksList) => updateTaskStatus(prevTasksList))

    syncDataToLocalStorage(updateTaskStatus)
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
    const updateTask: HandleTasks = (tasks: Task[]) => {
      return tasks.map((task) => {
        if (task.id === currentTask?.id) return currentTask
        return task
      })
    }

    setTasksList((prevTasksList) => updateTask(prevTasksList))

    syncDataToLocalStorage(updateTask)

    setCurrentTask(null)
  }

  const deleteTask = (id: string) => {
    if (currentTask) setCurrentTask(null)

    const removeTask: HandleTasks = (tasks: Task[]) => {
      const foundTaskIndex = tasks.findIndex((task) => task.id === id)

      if (foundTaskIndex > -1) {
        const updatedTasksList = [...tasks]
        updatedTasksList.splice(foundTaskIndex, 1)
        return updatedTasksList
      }
      return tasks
    }

    setTasksList((prevTasksList) => removeTask(prevTasksList))
    syncDataToLocalStorage(removeTask)
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
