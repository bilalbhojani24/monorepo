import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const twClassNames = (...args) => twMerge(classNames(...args));
