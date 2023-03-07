import { useUserContext } from 'contexts/UserProvider';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { getTodoById } from 'services/api/todosApi';

const TodoDetails = () => {
  const { isLoggedIn } = useUserContext();
  const { id } = useParams();
  const location = useLocation();
  const [todo, setTodo] = useState({});
  useEffect(() => {
    if (!isLoggedIn) return;
    getTodoById(id).then(setTodo);
  }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <div style={{ padding: '16px 0px' }}>
      <p>
        <Link to={location.state?.from || '/todos'}>Back to todos</Link>
      </p>
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
