import React from 'react';
import { twClassNames } from '@browserstack/utils';

const TwoColumnLayout = ({ item, itemIdx, handleClick }) => (
  <li className="flow-root">
    <div className="focus-within:ring-brand-500 hover:bg-base-50 relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2">
      <div
        className={twClassNames(
          item.background,
          'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
        )}
      >
        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-base-900 text-sm font-medium">
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
        <p className="text-base-500 mt-1 text-sm">{item.description}</p>
      </div>
    </div>
  </li>
);

export default TwoColumnLayout;
