import axios from 'axios';

const todosInstance = axios.create({
  baseURL: 'https://63bb3a8432d17a50908aa204.mockapi.io/tasks-list',
});

export const getTodos = async () => {
  try {
    const response = await todosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error('Нічого не знайдено');
  }
};

export const getTodoById = async id => {
  try {
    const response = await todosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Нічого не знайдено');
  }
};
