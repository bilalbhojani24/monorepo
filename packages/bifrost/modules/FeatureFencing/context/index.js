import { createContext, useContext } from 'react';

export const FEATURE_FENCING_CONTEXT = createContext(null);

export const useFeatureFencingContext = () =>
  useContext(FEATURE_FENCING_CONTEXT);
