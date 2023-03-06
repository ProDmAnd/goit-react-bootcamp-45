import Button from 'components/Button/Button';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TodoList({ todos = [], deleteTodo = () => {} }) {
  useEffect(() => {
    console.log('Todo List did mount');

    return () => {
      console.log('Todo List will unmount');
    };
  }, []);
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
          <p>
            <Link to={`${todo.id}`}>{todo.title}</Link>
          </p>
          <p>Completed: {todo.completed?.toString()}</p>
          <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}
