import { newsReducer } from './news/slice';
import { filtersReducer } from './todos/reducer';
import { todosReducer } from './todos/slice';
import { userReducer } from './user/slice';

const rootReducer = {
  todos: todosReducer,
  filters: filtersReducer,
  user: userReducer,
  news: newsReducer,
};

export default rootReducer;
