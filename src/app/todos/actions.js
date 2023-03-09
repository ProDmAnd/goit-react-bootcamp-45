import { actionCreator } from "app/actionCreator";

export const deleteTodoActionType = 'todos/deleteTodo';
export const addTodoActionType = 'todos/addTodo';
export const changeTodoFilterActionType = 'filters/changeStatus';
export const toggleTodoCompletedActionType = 'todos/toggleCompleted';

export const deleteTodoAction = payload => ({
  type: deleteTodoActionType,
  payload,
});

export const addTodoAction = actionCreator(addTodoActionType);
export const changeTodoFilterAction = actionCreator(changeTodoFilterActionType);
export const toggleTodoCompletedAction = actionCreator(
  toggleTodoCompletedActionType
);