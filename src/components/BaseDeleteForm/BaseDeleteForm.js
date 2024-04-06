import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import styles from './baseDeleteForm.module.scss'
import { deleteTodo } from '../../slices/todoSlice'
import Button, { buttonTypes } from '../Button/Button'


export const BaseDeleteForm = ({ type, setOpen, todo }) => {
  const dispatch = useDispatch();
  const { handleSubmit, } = useForm();
  const onSubmit = () => {
    dispatch(deleteTodo(todo.id))
    setOpen(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>
        Delete TODO
      </h1>
      <h2>Are you sure? Are you too lazy to do it?</h2>
      <div className={styles.ButtonContainer}>
        <Button type="submit" kind={type}>
          To be lazy
        </Button>
        <Button kind={buttonTypes.toCancel} onClick={() => setOpen(false)}>
          Cancel (Great!)
        </Button>
      </div>
    </form>
  );
}