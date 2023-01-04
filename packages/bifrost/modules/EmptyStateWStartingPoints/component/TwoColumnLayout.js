import React from 'react';
import classNames from 'classnames';

const TwoColumnLayout = ({ item, itemIdx, handleClick }) => {
  return (
    <li className="flow-root">
      <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-base-50">
        <div
          className={classNames(item.background, 'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg')}
        >
          <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-base-900">
            <a
              href="/"
              className="focus:outline-none"
              onClick={(e) => {
                handleClick(e, item.onClick, item);
              }}
            >
              <span className="absolute inset-0" aria-hidden="true" />
              <span>{item.title}</span>
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </h3>
          <p className="mt-1 text-sm text-base-500">{item.description}</p>
        </div>
      </div>
    </li>
  );
};

export default TwoColumnLayout;
