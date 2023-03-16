import useIsAuth from 'hooks/useIsAuth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children, to = '/', returnToTargetPage = false }) => {
  const location = useLocation();
  const { isLoggedIn } = useIsAuth();

  if (isLoggedIn) {
    return (
      <Navigate
        to={
          returnToTargetPage && location.state?.from ? location.state.from : to
        }
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};

export default PublicRoute;
