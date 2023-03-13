import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsByQuery } from './operations';

const news = createSlice({
  name: 'news',
  initialState: {
    list: [],
    searchOptions: {},
    requestId: '',
    isLoading: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsByQuery.pending, (state, { meta }) => {
        state.isLoading = true;
        state.requestId = meta.requestId;
      })
      .addCase(fetchNewsByQuery.fulfilled, (state, { payload, meta }) => {
        if (state.requestId === meta.requestId) {
          state.list = payload.hits;
          state.isLoading = false;
        }
      })
      .addCase(fetchNewsByQuery.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const newsReducer = news.reducer;
