import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
@typedef {{
    id: string,
    username: string,
    email: string,
    balance: number,
}} CurrentUser
 */

/**
@typedef {{
  user: CurrentUser,
  token: string,
}} SignInUpResponse
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

const updateToken = token => {
  someBackendApi.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : '';
};

const unauthorizedLogout = (statusCode = 0, dispatch = () => {}) => {
  if (statusCode === 401) {
    dispatch(userSignOut());
  }
};

const errorMessageToaster = error => {
  const errorMessage = error?.response?.data?.message;
  const messages =
    typeof errorMessage === 'string' ? [errorMessage] : errorMessage;
  messages.forEach(message => toast.error(message));
};

/** @type {import('@reduxjs/toolkit').AsyncThunk<SignInUpResponse, UserSignUp, {state: RootState}>} */
export const userSignUp = createAsyncThunk(
  'user/signUp',
  async ({ email, username, password }, thunkApi) => {
    try {
      const response = await someBackendApi.post('/auth/sign-up', {
        username,
        email,
        password,
      });
      updateToken(response.token);
      return response.data;
    } catch (error) {
      errorMessageToaster(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

/** @type {import('@reduxjs/toolkit').AsyncThunk<SignInUpResponse, UserSignIn, { state: RootState }>} */
export const userSignIn = createAsyncThunk(
  'user/signIn',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await someBackendApi.post('/auth/sign-in', {
        email,
        password,
      });
      updateToken(response.token);
      return response.data;
    } catch (error) {
      errorMessageToaster(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

/** @type {import('@reduxjs/toolkit').AsyncThunk<CurrentUser, any, { state: RootState }>} */
export const getCurrentUser = createAsyncThunk(
  'user/getCurrent',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token;
    if (!token) return thunkApi.rejectWithValue();
    try {
      updateToken(token);
      const response = await someBackendApi.get('/users/current');
      return response.data;
    } catch (error) {
      unauthorizedLogout(error.response.status, thunkApi.dispatch);
      errorMessageToaster(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

/** @type {import('@reduxjs/toolkit').AsyncThunk<void, any, { state: RootState }>} */
export const userSignOut = createAsyncThunk('user/signOut', async () => {
  try {
    await someBackendApi.delete('/auth/sign-out');
    updateToken();
  } catch (error) {
    return;
  }
});
