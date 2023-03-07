import axios from 'axios';

axios.defaults.baseURL = 'http://hn.algolia.com/api/v1';

export const getNews = async ({ query, hitsPerPage = 10, page } = {}) => {
  try {
    const response = await axios.get(`/search`, {
      params: { query, hitsPerPage, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Нічого не знайдено');
  }
};

const baseFetch = async (url, config = {}) => {
  const response = await fetch(`http://hn.algolia.com/api/v1${url}`, config);
  return await response.json();
};

export const fetchNews = async ({ query = '', hitsPerPage = 10 } = {}) => {
  try {
    const queryString = new URLSearchParams({ query, hitsPerPage });
    return await baseFetch(`/search?${queryString}`);
  } catch (error) {
    throw new Error('Нічого не знайдено');
  }
};
