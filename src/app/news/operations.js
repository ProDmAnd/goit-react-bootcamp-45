import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://hn.algolia.com/api/v1';

export const fetchNewsByQuery = createAsyncThunk(
  'getNews',
  async ({ query, hitsPerPage = 10, page } = {}) => {
    try {
      const response = await axios.get(`/search`, {
        params: { query, hitsPerPage, page },
      });
      return response.data;
    } catch (error) {
      throw new Error('Нічого не знайдено');
    }
  }
);
