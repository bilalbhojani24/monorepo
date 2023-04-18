import React from 'react';

export const LOGS_CONTEXT = React.createContext(null);

export const useLogsContext = () => React.useContext(LOGS_CONTEXT);
