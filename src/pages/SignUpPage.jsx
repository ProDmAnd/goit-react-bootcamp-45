import { useAppSelector } from 'app/reduxHooks';
import { userSignUp } from 'app/user/operations';
import LoginSignUpForm from 'components/LoginSignUpForm/LoginSignUpForm';
import useIsAuth from 'hooks/useIsAuth';
import React from 'react';
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
  const dispatch = useDispatch();

  const { signUp } = useIsAuth();

  const handleSubmit = async values => {
    //   dispatch(fetchTodosThunk());
  };

  return (
    <>
      <h1>Login page</h1>
      <LoginSignUpForm  signUp onSubmit={signUp} />
    </>
  );
};

export default SignUpPage;
