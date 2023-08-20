import { useState } from 'react'
import styles from './TaskInput.module.scss'
import { Task } from '../../@types/task.type'

interface TaskInputProps {
  addTask: (name: string) => void
  currentTask: Task | null
  editTask: (name: string) => void
  saveUpdatedTask: () => void
}

const TaskInput = (props: TaskInputProps) => {
  const { addTask, currentTask, editTask, saveUpdatedTask } = props

  const [taskName, setTaskName] = useState<string>('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (currentTask) {
      editTask(value)
    } else {
      setTaskName(value)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (currentTask) {
      saveUpdatedTask()
    } else {
      addTask(taskName)
      setTaskName('')
    }
  }

  return (
    <div className={styles.inputSection}>
      <form onSubmit={handleSubmit}>
        <input type='text' value={currentTask ? currentTask.name : taskName} onChange={onChangeInput} />
        <button type='submit'>
          <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </button>
      </form>
    </div>
  )
}

export default TaskInput
