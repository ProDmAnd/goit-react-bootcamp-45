import LoginSignUpForm from 'components/LoginSignUpForm/LoginSignUpForm';
import useIsAuth from 'hooks/useIsAuth';
import React from 'react';

const SignUpPage = () => {

  const { signUp } = useIsAuth();

  return (
    <>
      <h1>Login page</h1>
      <LoginSignUpForm  signUp onSubmit={signUp} />
    </>
  );
};

export default SignUpPage;
