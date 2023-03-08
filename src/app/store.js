import { devToolsEnhancer } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
import { statusFilters } from './constants';
import initialTodos from './todos.json';

const initialState = {
  todos: initialTodos,
  filters: {
    status: statusFilters.all,
  },
  user: {
    isLoggedIn: false,
    email: '',
    city: '',
    gender: '',
  },
};

const deleteTodoActionType = 'todos/deleteTodo';
const addTodoActionType = 'todos/addTodo';
const changeTodoFilterActionType = 'filters/changeStatus';
const toggleTodoCompletedActionType = 'todos/toggleCompleted';
const userLoginActionType = 'user/login';
const userLogoutActionType = 'user/logout';

export const deleteTodoAction = payload => ({
  type: deleteTodoActionType,
  payload,
});

const actionCreator = type => payload => ({ type, payload });

export const addTodoAction = actionCreator(addTodoActionType);
export const changeTodoFilterAction = actionCreator(changeTodoFilterActionType);
export const toggleTodoCompletedAction = actionCreator(
  toggleTodoCompletedActionType
);
export const userLoginAction = actionCreator(userLoginActionType);
export const userLogoutAction = actionCreator(userLogoutActionType);

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case deleteTodoActionType:
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== action.payload),
      };
    case addTodoActionType:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload.title,
            message: action.payload.message,
            id: Number(state.todos[state.todos.length - 1].id) + 1,
            completed: false,
          },
        ],
      };
    case changeTodoFilterActionType:
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
      };
    case toggleTodoCompletedActionType:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case userLoginActionType:
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          ...action.payload,
        },
      };
    case userLogoutActionType:
      return {
        ...state,
        user: {
          isLoggedIn: false,
          email: '',
          gender: '',
          city: '',
        },
      };
    default:
      return state;
  }
};

const enhancers = devToolsEnhancer();

const store = createStore(rootReducer, enhancers);

export default store;
