import styles from './TaskInput.module.scss'

const TaskInput = () => {
  return (
    <div className={styles.inputSection}>
      <form>
        <input type='text' name='' id='' />
        <button type='submit'>
          <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </button>
      </form>
    </div>
  )
}

export default TaskInput
