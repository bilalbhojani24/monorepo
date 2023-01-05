import React from 'react';
import classNames from 'classnames';
import { ChevronRightIcon } from '../../Icon';

const SignleColumnLayout = ({ item, itemIdx, handleClick }) => {
  return (
    <li>
      <div className="group relative flex items-start space-x-3 py-4">
        <div className="flex-shrink-0">
          <span className={classNames(item.background, 'inline-flex items-center justify-center h-10 w-10 rounded-lg')}>
            <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-base-900">
            <a
              href={item.href}
              onClick={(e) => {
                handleClick(e, item.onClick, item);
              }}
              className="cursor-pointer"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              {item.title}
            </a>
          </div>
          <p className="text-sm text-base-500">{item.description}</p>
        </div>
        <div className="flex-shrink-0 self-center">
          <ChevronRightIcon className="h-5 w-5 text-base-400 group-hover:text-base-500" aria-hidden="true" />
        </div>
      </div>
    </li>
  );
};

export default SignleColumnLayout;
