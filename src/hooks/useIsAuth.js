import { useAppSelector } from 'app/reduxHooks';
import { userSignIn, userSignUp } from 'app/user/operations';
import { userLogout } from 'app/user/slice';
import { useDispatch } from 'react-redux';

const useIsAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(state => !!state.user.token);

  const login = userData => {
    dispatch(userSignIn(userData));
    // dispatch(userActions.login(userData));
  };
  const logout = () => {
    dispatch(userLogout());
  };

  const signUp = values => {
    dispatch(userSignUp(values));
  };

  return { isLoggedIn, login, logout, signUp };
};

export default useIsAuth;
