import React from 'react';

export default function TodoList({ todos = [], deleteTodo = () => {} }) {
  console.debug('Todo List rerender');
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} style={{ display: 'flex' }}>
          <p>{todo.text}</p>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
