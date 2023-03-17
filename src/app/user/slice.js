import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  userSignIn,
  userSignOut,
  userSignUp
} from './operations';

const initialState = {
  user: {
    name: '',
    email: '',
    id: '',
    balance: 0,
  },
  token: '',
  isRefreshing: false,
  isLoading: false,
};

const startLoading = state => {
  state.isLoading = true;
};

const handleError = state => {
  state.isLoading = false;
};

const userFullfiled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoading = false;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userSignUp.pending, startLoading)
      .addCase(userSignUp.fulfilled, userFullfiled)
      .addCase(userSignUp.rejected, handleError)
      .addCase(userSignIn.pending, startLoading)
      .addCase(userSignIn.fulfilled, userFullfiled)
      .addCase(userSignIn.rejected, handleError)
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.user = payload;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(userSignOut.fulfilled, () => initialState)
  },
});

export const userReducer = userSlice.reducer;
