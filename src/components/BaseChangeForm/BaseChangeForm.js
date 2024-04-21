import React, { useContext } from "react";
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import classnames from 'classnames';

import styles from './baseChangeForm.module.scss'
import { addTodo, updateTodo } from '../../slices/todoSlice'
import Button, { buttonTypes } from '../Button/Button'
import { statusOptions } from '../FilterButton/FilterButton'
import * as Consts from '../../utils/consts'
import ThemeContext from '../../context/ThemeContext'


const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: '#fff',
    fontWeight: 500,
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? '#dedfe1' : isSelected ? '#cccdde' : isFocused ? '#646681' : '#fff',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontWeight: 500,
      color: isFocused & !isSelected ? '#fff' : '#000'
    };
  },
};
const vidationSchema = yup
  .object()
  .shape({
    title: yup.string()
      .required('Title is required')
      .max(50, 'Task is too big! You will never do it!'),
    todoStatus: yup.object().shape({
      value: yup.string().required(),
      label: yup.string().required()
    })
      .required('Please select a status')
      .oneOf(statusOptions, 'Status can be either Incomplete or Completed'),
  })
  .required()

const createTodo = (todo) => {
  return {
    id: uuid(),
    title: todo.title,
    status: todo.todoStatus.value,
    time: format(new Date(), Consts.DateFormat),
  }
}

export const BaseChangeForm = ({ type, setOpen, todo }) => {
  const { theme } = useContext(ThemeContext)
  const buttonText = type === buttonTypes.toAdd ? 'Add Task' : 'Update Task'
  const defaultValues = {
    title: todo ? todo.title : '',
    status: todo ? todo.status : Consts.Incomplete,
  }
  const defaultValue = statusOptions.find(opt => opt.value == [defaultValues.status])
  const dispatch = useDispatch();
  const { register, handleSubmit, control, formState: { errors }, } = useForm({
    resolver: yupResolver(vidationSchema),
    defaultValues
  });
  const onSubmit = (data) => {
    if (type === buttonTypes.toAdd) {
      dispatch(addTodo(createTodo(data)));
    } else if (type === buttonTypes.toUpdate) {
      if (todo.title !== data.title || todo.status !== data.todoStatus.value) {
        dispatch(updateTodo({ ...todo, title: data.title, status: data.todoStatus.value }));
      }
    }
    setOpen(false)
  }

  return (
    <form className={classnames(styles.form, styles[`form${theme.name}`])} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classnames(styles.formTitle, styles[`form${theme.name}`])}>
        {type === buttonTypes.toAdd ? 'Add' : 'Update'} TODO
      </h1>
      <label htmlFor="title">
        Title
        <input className={errors.title && styles.errTitleField} id="title" {...register("title")} />
      </label>
      {errors.title && <div className={styles.errTitleText}>{errors.title.message}</div>}
      <span>Status</span>
      <Controller
        render={({ field }) => (
          <Select {...field}
            className={styles.select}
            options={statusOptions}
            styles={colourStyles}
          />
        )}
        control={control}
        name="todoStatus"
        defaultValue={defaultValue}
      />
      {errors.todoStatus && <div className={styles.errStatusText}>{errors.todoStatus.message}</div>}
      <div className={styles.ButtonContainer}>
        <Button type="submit" kind={type}>
          {buttonText}
        </Button>
        <Button kind={buttonTypes.toCancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}