import ControlledForm from 'components/ControlledForm/ControlledForm';
import { useUserContext } from 'contexts/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useUserContext();

  const handleSubmit = async values => {
    login();
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/todos', { replace: true });
  //   }
  // }, [isLoggedIn, navigate]);

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
