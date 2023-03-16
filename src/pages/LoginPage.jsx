import LoginSignUpForm from 'components/LoginSignUpForm/LoginSignUpForm';
import useIsAuth from 'hooks/useIsAuth';

const LoginPage = () => {
  const { login } = useIsAuth();

  const handleSubmit = values => {
    login(values);
  };

  return (
    <>
      <h1>Login page</h1>
      <LoginSignUpForm onSubmit={handleSubmit} />
    </>
  );
};

export default LoginPage;
