import React from 'react';
import { useSelector } from 'react-redux';
import styles from './appContent.module.scss'
import { selectTodoList, selectFilterStatus } from '../../slices/todoSlice'
import TodoItem from '../TodoItem/TodoItem';
import SettingsContainer from '../SettingsContainer/SettingsContainer';

function AppContent() {
  const todoList = useSelector(selectTodoList)
  const filterStatus = useSelector(selectFilterStatus)

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <>
      <SettingsContainer counter={filteredTodoList.length} />
      <div className={styles.content__wrapper}>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        ) : (
          <div className={styles.emptyText}>
            No Todos
          </div>
        )}
      </div>
    </>
  )
}

export default AppContent;