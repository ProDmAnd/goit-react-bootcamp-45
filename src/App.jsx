import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<NewsLazy />} />
          <Route path="todos" element={<TodosSharedLayout />}>
            <Route index element={<TodosLazy />} />
            <Route path=":id" element={<TodoDetailsLazy />} />
          </Route>
          <Route path="login" element={<LoginPageLazy />} />
          <Route path="*" element={<FallbackComponent />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
