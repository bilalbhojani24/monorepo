import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import PropTypes from 'prop-types';

const PrivateComponent = ({ children, isOnboarding }) => {
  const isAuthenticatedUser = localStorage.getItem(AUTH_TOKEN_KEY);
  const isToBeOnboarded =
    isAuthenticatedUser && JSON.parse(isAuthenticatedUser)?.is_first_time;

  /// if not logged in, redirect to login
  if (!isAuthenticatedUser) return <Navigate to={AppRoute.LANDING} />;

  if (isOnboarding && !isToBeOnboarded)
    // if onboarding page hit, and if the user already onboarded go to root
    return <Navigate to={AppRoute.ROOT} />;

  // if first time user go to onboarding page else go to which ever page
  return isToBeOnboarded && !isOnboarding ? (
    <Navigate to={AppRoute.ONBOARDING} />
  ) : (
    children || ''
  );
};

PrivateComponent.propTypes = {
  children: PropTypes.node.isRequired,
  isOnboarding: PropTypes.bool
};

PrivateComponent.defaultProps = {
  isOnboarding: false
};

const OnlyPublicComponent = ({ children }) => {
  const isAuthenticatedUser = localStorage.getItem(AUTH_TOKEN_KEY);

  // if logged in redirect to dashboard
  return !isAuthenticatedUser ? children : <Navigate to={AppRoute.ROOT} />;
};

OnlyPublicComponent.propTypes = {
  children: PropTypes.node.isRequired
};

export { OnlyPublicComponent, PrivateComponent };
