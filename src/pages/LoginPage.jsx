import { fetchTodosThunk } from 'app/todos/operations';
import { userActions } from 'app/user/slice';
import LoginForm from 'components/LoginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const location = useLocation();

  const handleSubmit = async values => {
    dispatch(userActions.login(values));
    dispatch(fetchTodosThunk());
  };

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || '/todos'} replace />;
  }

  return (
    <>
      <h1>Login page</h1>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
};

export default LoginPage;
