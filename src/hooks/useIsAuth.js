import { useAppSelector } from 'app/reduxHooks';
import { userActions } from 'app/user/slice';
import { useDispatch } from 'react-redux';

const useIsAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(state => state.user.isLoggedIn);

  const login = userData => {
    dispatch(userActions.login(userData));
  };
  const logout = () => {
    dispatch(userActions.logout());
  };

  return { isLoggedIn, login, logout };
};

export default useIsAuth;
