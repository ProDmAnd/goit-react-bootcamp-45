import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const todosInstance = axios.create({
  baseURL: 'https://63bb3a8432d17a50908aa204.mockapi.io/tasks-list',
});

export const fetchTodosThunk = createAsyncThunk(
  'fetchTodos',
  async (_, thunkApi) => {
    try {
      const response = await todosInstance.get();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Нічого не знайдено',
      });
    }
  }
);

export const addTodo = createAsyncThunk('addTodo', async (todo, thunkApi) => {
  try {
    const response = await todosInstance.post('', todo);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: 'Щось пішло не так...',
    });
  }
});

export const deleteTodo = createAsyncThunk(
  'deleteTodo',
  async (todoId, thunkApi) => {
    try {
      const response = await todosInstance.delete(`/${todoId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Щось пішло не так...',
      });
    }
  }
);

export const updateTodo = createAsyncThunk(
  'updateTodo',
  async ({ update, todoId }, thunkApi) => {
    try {
      const response = await todosInstance.put(`/${todoId}`, update);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Щось пішло не так...',
      });
    }
  }
);

export const getTodoById = createAsyncThunk(
  'getTodoById',
  async (id, thunkApi) => {
    try {
      const response = await todosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Нічого не знайдено',
      });
    }
  }
);

//  const getTodos = async () => {
//   try {
//     const response = await todosInstance.get();
//     return response.data;
//   } catch (error) {
//     throw new Error('Нічого не знайдено');
//   }
// };

const addNewTodo = async ({ title = '', message = '' }) => {
  try {
    const response = await todosInstance.post('', { title, message });
    return response.data;
  } catch (error) {
    throw new Error('Нічого не знайдено');
  }
};

// export const fetchTodos = () => async (dispatch, getState) => {
//   dispatch(todosActions.getTodosRequest());
//   try {
//     const todos = await getTodos();
//     dispatch(todosActions.getTodoSuccess(todos));
//   } catch (error) {
//     dispatch(todosActions.getTodosError());
//   }
// };
