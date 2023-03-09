import { createSlice, nanoid } from '@reduxjs/toolkit';
import { statusFilters } from 'app/constants';

const todosSlice = createSlice({
  initialState: {
    /** @type {{id: string, createdAt: string, title: string, message: string, completed: boolean}[]} */
    todos: [],
    filters: {
      status: statusFilters.all,
    },
  },
  name: 'todos',
  reducers: {
    addTodo: {
      prepare(payload) {
        return {
          payload: {
            ...payload,
            completed: false,
            id: nanoid(),
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, { payload }) {
        state.todos.push(payload);
      },
    },
    deleteTodo(state, { payload }) {
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== payload),
      };
    },
    toggleCompleted(state, { payload }) {
      for (const todo of state.todos) {
        if (todo.id === payload) {
          todo.completed = !todo.completed;
          break;
        }
      }
    },
    changeStatusFilter(state, { payload }) {
      state.filters.status = payload;
    },
  },
});

export const todosReducer = todosSlice.reducer;

export const todosActions = todosSlice.actions;

export default todosSlice;
