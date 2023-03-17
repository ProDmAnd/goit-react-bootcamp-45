import { createSlice } from '@reduxjs/toolkit';
import { userSignOut } from 'app/user/operations';
import { statusFilters } from 'constants/todosConstants';
import { addTodo, deleteTodo, fetchTodosThunk, updateTodo } from './operations';

const startLoading = state => {
  state.isLoading = true;
  state.error = '';
};

const handleError = (state, { payload }) => {
  state.error = payload.message;
  state.isLoading = false;
};

const initialState = {
  /** @type {import('db/models/todos')['Todo'][]} */
  todos: [],
  filters: {
    status: statusFilters.all,
  },
  isLoading: false,
  error: '',
  processingTodoId: '',
};

const todosSlice = createSlice({
  initialState,
  name: 'todos',
  reducers: {
    changeStatusFilter(state, { payload }) {
      state.filters.status = payload;
    },
    setTodos(state, { payload }) {
      state.todos = payload;
    },
    updateTodo(state, { payload }) {
      state.todos = state.todos.map(todo =>
        todo.id === payload.id ? payload : todo
      );
    },
    addTodo(state, { payload }) {
      state.todos.push(payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodosThunk.pending, startLoading)
      .addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
        state.todos = payload;
        state.isLoading = false;
      })
      .addCase(fetchTodosThunk.rejected, handleError)
      .addCase(addTodo.pending, startLoading)
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        state.todos.push(payload);
        state.isLoading = false;
      })
      .addCase(addTodo.rejected, handleError)
      .addCase(deleteTodo.pending, (state, { meta }) => {
        state.error = '';
        state.processingTodoId = meta.arg;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter(({ id }) => id !== payload.id);
        state.isLoading = false;
        state.processingTodoId = '';
      })
      .addCase(deleteTodo.rejected, (state, { payload }) => {
        state.processingTodoId = '';
        state.error = payload.message;
      })
      .addCase(updateTodo.pending, (state, { meta }) => {
        state.error = '';
        state.processingTodoId = meta.arg.todoId;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.map(todo =>
          todo.id === payload.id ? payload : todo
        );
        state.isLoading = false;
        state.processingTodoId = '';
      })
      .addCase(updateTodo.rejected, (state, { payload }) => {
        state.processingTodoId = '';
        state.error = payload.message;
      })
      .addCase(userSignOut.fulfilled, () => initialState);
  },
});

export const todosReducer = todosSlice.reducer;

export const todosActions = todosSlice.actions;

export default todosSlice;
