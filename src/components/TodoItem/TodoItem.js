import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import styles from './todoItem.module.scss'
import { updateTodo } from '../../slices/todoSlice'
import { getFormatDate } from '../../utils/getDate'
import ModalForm from '../ModalForm/ModalForm';
import { buttonTypes } from '../Button/Button';
import CheckboxMain from "../CheckboxMain/CheckboxMain";
import * as Consts from '../../utils/consts'

function TodoItem({ todo }) {
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
    <div className={styles.item}>
      <div className={styles.todoDetails}>
        <div>
          <CheckboxMain isChecked={isCompleted} onCheck={onCheck} />
        </div>
        <div className={styles.texts}>
          <p
            className={classnames(
              styles.todoText,
              isCompleted && styles['todoText--completed'],
            )}
          >
            {todo.title}
          </p>
          <p className={styles.time}>
            {getFormatDate(todo.time)}
          </p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div className={classnames(styles.icon, styles.icon__edit)}
          onClick={() => handleUpdate()}>
          <MdEdit />
        </div>
        <div className={classnames(styles.icon, styles.icon__delete)}
          onClick={() => handleDelete()}>
          <MdDelete />
        </div>
      </div>
      <ModalForm isOpen={isOpen} setOpen={setOpen} triggerShow={false} type={actionType} todo={todo} />
    </div>
  )
}

export default TodoItem