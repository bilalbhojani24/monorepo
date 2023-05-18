import { createContext } from 'react';

import { PICKER_LEVELS } from '../const/DateRangepickerconst';

export const PickerLevelContext = createContext(PICKER_LEVELS[0]);
