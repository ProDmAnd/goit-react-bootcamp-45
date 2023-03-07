import Button from 'components/Button/Button';
import { useThemeContext } from 'contexts/ThemeProvider';
import React, { Suspense, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const SharedLayout = () => {
  const { theme, toggle } = useThemeContext();
  useEffect(() => {
    console.log('shared layout did mount');

    return () => {
      console.log('shared layout will unmount');
    };
  }, []);
  return (
    <>
      <div>theme: {theme}</div>
      <Button onClick={toggle}>Switch theme</Button>
      <div style={{ display: 'flex', gap: 20 }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
      <div>
        <Suspense fallback={<h2>Loading page...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default SharedLayout;
