import { Button } from '@mui/material';
import { useAppSelector } from 'app/reduxHooks';
import * as todosOperations from 'app/todos/operations';
import { selectVisibleTodosOptimized } from 'app/todos/selectors';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function TodoList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const processingTodoId = useAppSelector(
    state => state.todos.processingTodoId
  );
  const visibleTodos = useAppSelector(selectVisibleTodosOptimized);

  const filteredTodos = useMemo(() => {
    const searchString = searchParams.get('search').toLowerCase();
    return visibleTodos.filter(({ title }) =>
      title.toLowerCase().includes(searchString)
    );
  }, [visibleTodos, searchParams]);

  const todoAction =
    (callback = () => {}, data) =>
    () =>
      callback(data);

  const deleteTodo = id => {
    dispatch(todosOperations.deleteTodo(id));
  };

  const toggleTodo = (id, completed) => {
    return () => {
      dispatch(
        todosOperations.updateTodo({ todoId: id, update: { completed } })
      );
    };
  };

  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 20,
      }}
    >
      {filteredTodos.map(todo => (
        <li
          key={todo.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            border: '1px solid black',
            borderRadius: 10,
          }}
        >
          <p
            style={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(todo.id.toString(), { state: { from: location } })
            }
          >
            {todo.title}
          </p>
          <p
            style={{ cursor: 'pointer' }}
            onClick={toggleTodo(todo.id, !todo.completed)}
          >
            Completed: {todo.completed?.toString()}
          </p>
          <Button
            variant="contained"
            disabled={todo.id === processingTodoId}
            onClick={todoAction(deleteTodo, todo.id)}
          >
            {todo.id === processingTodoId ? 'Processing...' : 'Delete'}
          </Button>
        </li>
      ))}
    </ul>
  );
}
