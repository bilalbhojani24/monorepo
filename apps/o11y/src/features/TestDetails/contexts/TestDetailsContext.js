import React from 'react';

export const TEST_DETAILS_CONTEXT = React.createContext(null);

export const useTestDetailsContentContext = () =>
  React.useContext(TEST_DETAILS_CONTEXT);
