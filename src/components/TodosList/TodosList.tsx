import TaskInput from '../TaskInput'
import TasksList from '../TasksList'
import styles from './TodosList.module.scss'

const TodosList = () => {
  return (
    <div className={styles.container}>
      <TaskInput />
      <TasksList />
      <TasksList />
    </div>
  )
}

export default TodosList
