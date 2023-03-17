import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAllTodos } from 'db';
import { toast } from 'react-hot-toast';

const todosInstance = axios.create({
  baseURL: 'https://63bb3a8432d17a50908aa204.mockapi.io/tasks-list',
});

const errors = {
  404: 'Нічого не знайдено',
};

export const fetchTodosThunk = createAsyncThunk(
  'fetchTodos',
  async (_, thunkApi) => {
    try {
      const response = await getAllTodos();
      return response;
    } catch (error) {
      console.error(error);
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
      const response = await toast.promise(
        todosInstance.put(`/${todoId}`, update),
        {
          success: resp =>
            `Задача помічена ${
              resp.data.completed ? 'завершеною' : 'в процессі'
            }`,
          error: err => errors[err.response.status],
        }
      );
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
