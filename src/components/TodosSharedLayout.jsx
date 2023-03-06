import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const TodosSharedLayout = () => {
  useEffect(() => {
    console.log('todos shared layout did mount');

    return () => {
      console.log('todos shared layout will unmount');
    };
  }, []);
  return (
    <>
      <div>Total todos: 123</div>
      <Outlet />
    </>
  );
};

export default TodosSharedLayout;
