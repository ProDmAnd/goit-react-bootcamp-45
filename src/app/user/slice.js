import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  city: '',
  gender: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(
      state,
      /** @type {import('@reduxjs/toolkit').PayloadAction<{email: string, city: string, gender: string}>} */ {
        payload,
      }
    ) {
      return { ...state, isLoggedIn: true, ...payload };
    },
    logout(state, { payload }) {
      return { ...initialState };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
