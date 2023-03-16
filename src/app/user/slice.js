import { createSlice } from '@reduxjs/toolkit';
import { userSignIn, userSignUp } from './operations';

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
  reducers: {
    userLogout() {
      // Це важливо, щоб при обнуленні стану використовувався іммутабельний підхід. Інакше не працює!
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userSignUp.pending, startLoading)
      .addCase(userSignUp.fulfilled, userFullfiled)
      .addCase(userSignUp.rejected, handleError)
      .addCase(userSignIn.pending, startLoading)
      .addCase(userSignIn.fulfilled, userFullfiled)
      .addCase(userSignIn.rejected, handleError);
  },
});

export const userReducer = userSlice.reducer;

export const { userLogout } = userSlice.actions;
