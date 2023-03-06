import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SharedLayout from './components/SharedLayout/SharedLayout';
import Todos from './components/Todos/Todos';
import TodosSharedLayout from './components/TodosSharedLayout';
import News from 'pages/News';
import TodoDetails from 'pages/TodoDetails';

const FallbackComponent = () => <h2>Page not found</h2>;

const App = () => {
  return (
    <div style={{ padding: 30 }}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<News />} />
          <Route path="todos" element={<TodosSharedLayout />}>
            <Route index element={<Todos />} />
            <Route path=":id" element={<TodoDetails />} />
          </Route>
          <Route path="*" element={<FallbackComponent />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
