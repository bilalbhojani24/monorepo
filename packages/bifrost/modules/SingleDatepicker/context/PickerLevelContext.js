import { createContext } from 'react';

import { PICKER_LEVELS } from '../const/singleDatepicker';

export const PickerLevelContext = createContext(PICKER_LEVELS[0]);
