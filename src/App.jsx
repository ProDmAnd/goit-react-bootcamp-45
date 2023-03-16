import { useAppSelector } from 'app/reduxHooks';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import SharedLayout from './components/SharedLayout/SharedLayout';
import TodosSharedLayout from './components/TodosSharedLayout';

const FallbackComponent = () => <h2>Page not found</h2>;

const TodoDetailsLazy = React.lazy(() =>
  import('pages/TodoDetails' /* webpackChunkName: 'todo-details' */)
);
const TodosLazy = React.lazy(() =>
  import('pages/Todos' /* webpackChunkName: 'todos' */)
);
const NewsLazy = React.lazy(() =>
  import('pages/News' /* webpackChunkName: 'news' */)
);
const LoginPageLazy = React.lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: 'login-page' */)
);
const SignUpPageLazy = React.lazy(() =>
  import('pages/SignUpPage' /* webpackChunkName: 'sign-up-page' */)
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useAppSelector(state => state.user.isRefreshing);

  // useEffect(() => {
  //   dispatch(userActions.refreshUser());
  //   setTimeout(() => {
  //     dispatch(userActions.login({ email: 'User@mail.com' }));
  //   }, 2000);
  // }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <div>Refresh User</div>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<NewsLazy />} />
            <Route
              path="todos"
              element={
                <PrivateRoute to="/login" returnToTargetPage>
                  <TodosSharedLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<TodosLazy />} />
              <Route path=":id" element={<TodoDetailsLazy />} />
            </Route>
            <Route
              path="login"
              element={
                <PublicRoute to="/todos" returnToTargetPage>
                  <LoginPageLazy />
                </PublicRoute>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoute to="/todos" returnToTargetPage>
                  <SignUpPageLazy />
                </PublicRoute>
              }
            />
            <Route path="*" element={<FallbackComponent />} />
          </Route>
        </Routes>
      )}
      <Toaster />
    </>
  );
};

export default App;
