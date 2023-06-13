import { createContext, useContext } from 'react';

export const SUITE_HEALTH_CONTEXT = createContext(null);

export const useSuiteHealthContext = () => useContext(SUITE_HEALTH_CONTEXT);
