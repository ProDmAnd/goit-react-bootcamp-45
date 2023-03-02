import Button from 'components/Button';
import React from 'react';

export default function TodoList({ todos = [], deleteTodo = () => {} }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ display: 'flex' }}>
          <p>{todo.text}</p>
          <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}
