import { newsReducer } from './news/slice';
import { todosReducer } from './todos/slice';
import { userReducer } from './user/slice';

const rootReducer = {
  todos: todosReducer,
  user: userReducer,
  news: newsReducer,
};

export default rootReducer;
