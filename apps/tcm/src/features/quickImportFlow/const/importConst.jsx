import React from 'react';
import {
  AccessTimeFilledIcon,
  CheckCircleRoundedIcon,
  WarningRoundedIcon
} from 'assets/icons';

export const WARNING_DATA = {
  id: 'import-project-warning',
  title:
    'Import activity still in progress. We will notify you once it completes.',
  isCondensed: true,
  description: '',
  headerIcon: <AccessTimeFilledIcon className="text-attention-400" />,
  type: 'ongoing'
};

export const SUCCESS_DATA = {
  id: 'import-project-success',
  title: 'Project imported successfully',
  description:
    'Congratulations, all your selected projects have been successfully imported.',
  isCondensed: false,
  firstButton: 'View Projects',
  secondButton: 'Dismiss',
  headerIcon: <CheckCircleRoundedIcon className="text-success-500" />,
  type: 'completed'
};

export const FAILURE_DATA = {
  id: 'import-project-failure',
  title: 'Project import failed',
  description:
    'Unfortunately, due to some issues we couldn’t import your projects',
  isCondensed: false,
  firstButton: 'View Report',
  secondButton: 'Retry Import',
  headerIcon: <WarningRoundedIcon className="text-danger-600" />,
  type: 'failure'
};

export const INFINITY = 2147483646;
export const ONGOING = 'ongoing';
export const COMPLETED = 'completed';
export const FAILURE = 'failure';
export const INPUT_FIELD_ERROR = 'This field is required';
