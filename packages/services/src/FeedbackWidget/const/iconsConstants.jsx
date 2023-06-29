import React from 'react';
import { twClassNames } from '@browserstack/utils';

export const thumbsDown = (
  <div
    className={twClassNames(
      'flex h-[45px] w-[45px] items-center justify-center'
    )}
  >
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twClassNames('mt-[4px]')}
    >
      <path
        d="M36.0002 17.375C36.0002 19.239 34.4892 20.75 32.6252 20.75C30.7612 20.75 29.2502 19.239 29.2502 17.375V3.875C29.2502 2.01104 30.7612 0.500002 32.6252 0.500002C34.4892 0.500002 36.0002 2.01104 36.0002 3.875V17.375Z"
        fill="#4B5563"
      />
      <path
        d="M27.0002 17.75V5.53115C27.0002 3.82668 26.0372 2.2685 24.5127 1.50623L24.4005 1.45016C23.1508 0.825308 21.7728 0.500001 20.3756 0.500001L8.18932 0.5C6.04426 0.5 4.19739 2.01407 3.77671 4.11748L1.07671 17.6175C0.519796 20.402 2.64961 23 5.48932 23H13.5002V32C13.5002 34.4853 15.5149 36.5 18.0002 36.5C19.2428 36.5 20.2502 35.4926 20.2502 34.25V32.75C20.2502 30.8027 20.8818 28.9079 22.0502 27.35L25.2002 23.15C26.3686 21.5921 27.0002 19.6973 27.0002 17.75Z"
        fill="#4B5563"
      />
    </svg>
  </div>
);
export const thumbsUp = (
  <div
    className={twClassNames(
      'flex h-[45px] w-[45px] items-center justify-center'
    )}
  >
    <svg
      width="36"
      height="37"
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twClassNames('mt-[-4px]')}
    >
      <path
        d="M0 19.625C0 17.761 1.51104 16.25 3.375 16.25C5.23896 16.25 6.75 17.761 6.75 19.625V33.125C6.75 34.989 5.23896 36.5 3.375 36.5C1.51104 36.5 0 34.989 0 33.125V19.625Z"
        fill="#4B5563"
      />
      <path
        d="M9 19.25V31.4688C9 33.1733 9.96301 34.7315 11.4875 35.4938L11.5997 35.5498C12.8494 36.1747 14.2274 36.5 15.6246 36.5H27.8109C29.9559 36.5 31.8028 34.9859 32.2235 32.8825L34.9235 19.3825C35.4804 16.598 33.3506 14 30.5109 14H22.5V5C22.5 2.51472 20.4853 0.5 18 0.5C16.7574 0.5 15.75 1.50736 15.75 2.75V4.25C15.75 6.19733 15.1184 8.09213 13.95 9.65L10.8 13.85C9.6316 15.4079 9 17.3027 9 19.25Z"
        fill="#4B5563"
      />
    </svg>
  </div>
);
