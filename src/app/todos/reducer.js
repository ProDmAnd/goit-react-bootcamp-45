import { statusFilters } from 'app/constants';
import {
  addTodoActionType,
  changeTodoFilterActionType,
  deleteTodoActionType,
  toggleTodoCompletedActionType
} from './actions';
import initialTodos from './todos.json';

const initialState = initialTodos;

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case deleteTodoActionType:
      return state.todos.filter(({ id }) => id !== action.payload);
    case addTodoActionType:
      return [
        ...state.todos,
        {
          title: action.payload.title,
          message: action.payload.message,
          id: Number(state.todos[state.todos.length - 1].id) + 1,
          completed: false,
        },
      ];
    case toggleTodoCompletedActionType:
      return state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

export const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case changeTodoFilterActionType:
      return { ...state, status: action.payload };

    default:
      return state;
  }
};
