import { createReducer } from '@reduxjs/toolkit';
import { statusFilters } from 'app/constants';
import {
  addTodoAction,
  changeTodoFilterAction,
  deleteTodoAction,
  toggleTodoCompletedAction
} from './actions';
import { fetchTodosThunk } from './operations';
import initialTodos from './todos.json';

export const todosReducer = createReducer(initialTodos, {
  [addTodoAction]: (state, { payload }) => [...state, payload],
  [deleteTodoAction]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [toggleTodoCompletedAction]: (state, { payload }) =>
    state.map(todo =>
      todo.id === payload ? { ...todo, completed: !todo.completed } : todo
    ),
  [fetchTodosThunk.fulfilled]: (state, { payload }) => payload,
});

// export const todosReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case deleteTodoAction.type:
//       return state.filter(({ id }) => id !== payload);
//     case addTodoAction.type:
//       return [...state, payload];
//     case toggleTodoCompletedAction.type:
//       return state.map(todo =>
//         todo.id === payload ? { ...todo, completed: !todo.completed } : todo
//       );
//     default:
//       return state;
//   }
// };

const filtersInitialState = {
  status: statusFilters.all,
};

export const filtersReducer = createReducer(filtersInitialState, builder => {
  builder.addCase(changeTodoFilterAction, (state, { payload }) => {
    state.status = payload;
  });
});

// export const filtersReducer = (
//   state = filtersInitialState,
//   { type, payload }
// ) => {
//   switch (type) {
//     case changeTodoFilterAction.type:
//       return { ...state, status: payload };

//     default:
//       return state;
//   }
// };
