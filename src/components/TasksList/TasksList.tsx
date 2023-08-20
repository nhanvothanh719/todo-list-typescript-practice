import styles from './TasksLists.module.scss'

interface TasksListProps {
  isDoneTasksList: boolean
}

const TasksList = (props: TasksListProps) => {
  const { isDoneTasksList } = props

  return (
    <>
      <h2 className={styles.tasksCategory}>{isDoneTasksList ? 'Completed' : 'Not Completed'}</h2>
      <ul className={styles.tasks}>
        <li className={styles.task}>
          <input type='checkbox' />
          <span className={isDoneTasksList ? `${styles.taskName} ${styles.taskCompleted}` : `${styles.taskName}`}>
            Task 1
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
        <li className={styles.task}>
          <input type='checkbox' />
          <span className={isDoneTasksList ? `${styles.taskName} ${styles.taskCompleted}` : `${styles.taskName}`}>
            Task 1
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
      </ul>
    </>
  )
}

export default TasksList
