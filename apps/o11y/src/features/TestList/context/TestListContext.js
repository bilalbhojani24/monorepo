import React, { useContext } from 'react';

export const TestListContext = React.createContext();

export const useTestListContext = () => useContext(TestListContext);
