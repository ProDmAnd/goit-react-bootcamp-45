// @ts-check
import { createSelector } from '@reduxjs/toolkit';
import { statusFilters } from 'app/constants';

/** @param {RootState} state */
export const selectTodos = state => state.todos.todos;
/** @param {RootState} state */
export const selectTodoIsLoading = state => state.todos.isLoading;
/** @param {RootState} state */
export const selectTodoError = state => state.todos.error;
/** @param {RootState} state */
export const selectTodosFilterStatus = state => state.todos.filters.status;
/** @param {RootState} state */
export const selectTodoIdProcessing = state => state.todos.processingTodoId;

/** @param {RootState} state */
export const selectTaskCount = state => {
  console.log('Calculating task count');
  const tasks = selectTodos(state);
  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
};

export const selectTaskCountOptimized = createSelector([selectTodos], tasks => {
  console.log('Calculating task count. Now memoized!');
  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});

/**
 * @template T
 * @param {T[]} tasks
 * @param {string} statusFilter
 * @param {(data: T) => boolean} filterCallback
 * @returns {T[]}
 */
const getVisibleTasks = (
  tasks = [],
  statusFilter,
  filterCallback = () => true
) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter(filterCallback);
    case statusFilters.completed:
      return tasks.filter(filterCallback);
    default:
      return tasks;
  }
};

/** @param {RootState} state */
export const selectVisibleTodos = state => {
  const todos = state.todos.todos;
  const filterStatus = state.todos.filters.status;

  return getVisibleTasks(todos, filterStatus, todo => !!todo.title);
};

export const selectVisibleTodosOptimized = createSelector(
  [selectTodosFilterStatus, selectTodos],
  (filterStatus, todos) => {
    return getVisibleTasks(todos, filterStatus);
  }
);
