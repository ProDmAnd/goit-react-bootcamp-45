import { createAction, nanoid } from '@reduxjs/toolkit';

export const addTodoAction = createAction(
  'todos/addTodo',
  ({ title, message }) => ({
    payload: { title, message, completed: false, id: nanoid() },
  })
);
export const deleteTodoAction = createAction('todos/deleteTodo');
export const changeTodoFilterAction = createAction('filters/changeStatus');
export const toggleTodoCompletedAction = createAction('todos/toggleCompleted');
