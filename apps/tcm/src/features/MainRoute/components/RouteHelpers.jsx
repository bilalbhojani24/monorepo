import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import PropTypes from 'prop-types';

const PrivateComponent = ({ children }) => {
  const isAuthenticatedUser = localStorage.getItem(AUTH_TOKEN_KEY);

  /// if not logged in, redirect to login
  return isAuthenticatedUser ? (
    children || ''
  ) : (
    <Navigate to={AppRoute.LANDING} />
  );
};

PrivateComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const OnlyPublicComponent = ({ children }) => {
  const isAuthenticatedUser = localStorage.getItem(AUTH_TOKEN_KEY);

  // if logged in redirect to dashboard
  return !isAuthenticatedUser ? children : <Navigate to={AppRoute.ROOT} />;
};

OnlyPublicComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export { OnlyPublicComponent, PrivateComponent };
