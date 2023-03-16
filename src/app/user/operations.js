// @ts-check
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
@typedef {{
  user: {
    id: string,
    username: string,
    email: string,
    balance: number,
  },
  token: string,
}} UserResponse
 */

/** 
@typedef {{ 
  email: string, 
  password:string 
}} UserSignIn
 */

/** 
@typedef {UserSignIn & { 
  username: string,
}} UserSignUp
 */

const someBackendApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + 'api',
});

const errorMessageToaster = error => {
  const errorMessage = error?.response?.data?.message;
  const messages =
    typeof errorMessage === 'string' ? [errorMessage] : errorMessage;
  messages.forEach(message => toast.error(message));
};

/** 
@type {import('@reduxjs/toolkit').AsyncThunk<UserResponse, UserSignUp, {state: RootState}>} */
export const userSignUp = createAsyncThunk(
  'user/signUp',
  async ({ email, username, password }, thunkApi) => {
    try {
      const response = await someBackendApi.post('/auth/sign-up', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.debug(error.response.data);
      errorMessageToaster(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

/** 
@type {import('@reduxjs/toolkit').AsyncThunk<UserResponse, UserSignIn, { state: RootState }>} */
export const userSignIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await someBackendApi.post('/auth/sign-in', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.debug(error.response.data);
      errorMessageToaster(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
