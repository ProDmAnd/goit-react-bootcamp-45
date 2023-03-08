import Button from 'components/Button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TodoList({
  todos = [],
  deleteTodo = () => {},
  toggleCompleted = () => {},
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 20,
      }}
    >
      {todos.map(todo => (
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
            onClick={() => toggleCompleted(todo.id)}
          >
            Completed: {todo.completed?.toString()}
          </p>
          <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}
