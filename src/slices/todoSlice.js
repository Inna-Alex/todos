import { createSlice } from '@reduxjs/toolkit';


function getInitialTodo() {
  const todoList = localStorage.getItem('todoList')
  if (todoList) {
    return JSON.parse(todoList)
  }
  localStorage.setItem('todoList', [])
  return []
}

export const initialState = {
  filterStatus: 'all',
  todoList: getInitialTodo()
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
  },
})

export const { updateFilterStatus, addTodo, updateTodo, deleteTodo } = todoSlice.actions

export const selectTodoList = (state) => state.todo.todoList
export const selectFilterStatus = (state) => state.todo.filterStatus

export default todoSlice.reducer