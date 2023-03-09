import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

const TodoDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const todo = useSelector(state => state.todos.todos.find(todo => todo.id === id));
  const location = useLocation();
  // const [todo, setTodo] = useState({});
  // useEffect(() => {
  //   if (!isLoggedIn) return;
  //   getTodoById(id).then(setTodo);
  // }, [id, isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!todo) {
    return <Navigate to="/todos" replace />;
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
