import { useAppSelector } from 'app/reduxHooks';
import { userSignIn, userSignOut, userSignUp } from 'app/user/operations';
import { useDispatch } from 'react-redux';

const useIsAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(state => !!state.user.token);

  const login = userData => {
    dispatch(userSignIn(userData));
  };
  const logout = () => {
    dispatch(userSignOut());
  };

  const signUp = values => {
    dispatch(userSignUp(values));
  };


  return { isLoggedIn, login, logout, signUp };
};

export default useIsAuth;
