import React, { useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import styles from './todoItem.module.scss'
import { updateTodo } from '../../slices/todoSlice'
import { getFormatDate } from '../../utils/getDate'
import ModalForm from '../ModalForm/ModalForm'
import { buttonTypes } from '../Button/Button'
import CheckboxMain from '../CheckboxMain/CheckboxMain'
import TodoActions from '../TodoActions/TodoActions'
import * as Consts from '../../utils/consts'
import ThemeContext from '../../context/ThemeContext';

function TodoItem({ todo }) {
  const { theme } = useContext(ThemeContext)
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [actionType, setActionType] = useState(buttonTypes.toAdd);
  const [isCompleted, setIsCompleted] = useState(todo.status === Consts.Completed)

  useEffect(() => {
    setIsCompleted(todo.status === Consts.Completed)
  }, [isOpen, todo])

  const handleDelete = () => {
    setActionType('toDelete')
    setOpen(true)
  }

  const handleUpdate = () => {
    setActionType('toUpdate')
    setOpen(true)
  }

  const onCheck = () => {
    setIsCompleted(!isCompleted)
    dispatch(
      updateTodo({ ...todo, status: isCompleted ? Consts.Incomplete : Consts.Completed })
    );
  }

  return (
    <div className={classnames(styles.item, styles[`item${theme.name}`])}>
      <div className={styles.todoDetails}>
        <div>
          <CheckboxMain isChecked={isCompleted} onCheck={onCheck} />
        </div>
        <div className={styles.texts}>
          <p
            className={classnames(
              styles.todoText,
              styles[`todo${theme.name}`],
              isCompleted && styles['todoText--completed'],
            )}
          >
            {todo.title}
          </p>
          <p className={classnames(styles.time, styles[`todo${theme.name}`],)}>
            {getFormatDate(todo.time)}
          </p>
        </div>
      </div>
      <TodoActions handleUpdate={handleUpdate} handleDelete={handleDelete} />
      <ModalForm isOpen={isOpen} setOpen={setOpen} triggerShow={false} type={actionType} todo={todo} />
    </div>
  )
}

export default TodoItem