import { useState } from 'react'
import styles from './TaskInput.module.scss'

interface TaskInputProps {
  addTask: (name: string) => void
}

const TaskInput = (props: TaskInputProps) => {
  const { addTask } = props

  const [taskName, setTaskName] = useState<string>('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addTask(taskName)

    setTaskName('')
  }

  return (
    <div className={styles.inputSection}>
      <form onSubmit={handleSubmit}>
        <input type='text' value={taskName} onChange={onChangeInput} />
        <button type='submit'>
          <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </button>
      </form>
    </div>
  )
}

export default TaskInput
