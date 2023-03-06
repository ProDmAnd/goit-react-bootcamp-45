import Button from 'components/Button/Button';
import { useThemeContext } from 'contexts/ThemeProvider';
import React from 'react';
import { useEffect } from 'react';
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
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
