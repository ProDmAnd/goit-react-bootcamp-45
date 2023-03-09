import { userLoginAction } from 'app/user/actions';
import ControlledForm from 'components/ControlledForm/ControlledForm';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const location = useLocation();

  const handleSubmit = async values => {
    dispatch(userLoginAction(values));
  };

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || '/todos'} replace />;
  }

  return (
    <div>
      <h1>Login page</h1>
      <ControlledForm onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
