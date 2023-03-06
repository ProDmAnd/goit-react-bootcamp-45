import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTodoById } from 'services/api/todosApi';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({});
  useEffect(() => {
    getTodoById(id).then(setTodo);
  }, [id]);
  return (
    <div style={{ padding: '16px 0px' }}>
      <span>
        {moment(todo.createdAt).format('[Day:] DD MM YY [Hours:]  HH:mm A')} -{' '}
        {moment(todo.createdAt).add(1, 'day').startOf('day').format('LLL')}
      </span>
      <h2>{todo.title}</h2>
      <p>{todo.message}</p>
      <p>Completed: {`${todo.completed}`}</p>
    </div>
  );
};

export default TodoDetails;
