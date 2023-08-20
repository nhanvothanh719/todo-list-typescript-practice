import { Task } from '../../@types/task.type'
import styles from './TasksLists.module.scss'

interface TasksListProps {
  isDoneTasksList: boolean
  tasksList: Task[]
  changeTaskStatus: (id: string, isDone: boolean) => void
}

const TasksList = (props: TasksListProps) => {
  const { isDoneTasksList, tasksList, changeTaskStatus } = props

  const handleChangeStatus = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.target.checked)
  }

  return (
    <>
      <h2 className={styles.tasksCategory}>{isDoneTasksList ? 'Completed' : 'Not Completed'}</h2>
      <ul className={styles.tasks}>
        {tasksList.map((task) => (
          <li key={task.id} className={styles.task}>
            <input type='checkbox' checked={task.isDone} onChange={handleChangeStatus(task.id)} />
            <span className={isDoneTasksList ? `${styles.taskName} ${styles.taskCompleted}` : `${styles.taskName}`}>
              {task.name}
            </span>
            <div className={styles.taskActions}>
              <button>
                <i className='fa fa-pencil-square-o' aria-hidden='true'></i>
              </button>
              <button>
                <i className='fa fa-trash-o' aria-hidden='true'></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TasksList
