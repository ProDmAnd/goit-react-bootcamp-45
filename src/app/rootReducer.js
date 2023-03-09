import { combineReducers } from 'redux';
import { filtersReducer, todosReducer } from './todos/reducer';
import userReducer from './user/reducer';

export default combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
  user: userReducer,
});