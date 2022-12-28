import classNames from 'classnames';
import React from 'react';
import Button from '../../Button';
import { TOOLTIP_THEME } from '../const/tooltipConstants';

const Layout = ({ actionObject, description, title, theme }) => {
  return (
    <div
      className={classNames('rounded-md shadow max-w-xs p-3', {
        'bg-white ': TOOLTIP_THEME[0] === theme,
        'bg-gray-800': TOOLTIP_THEME[1] === theme,
      })}
    >
      <p
        className={classNames('font-semibold mb-2', {
          'text-white': TOOLTIP_THEME[1] === theme,
        })}
      >
        {title}
      </p>
      <p
        className={classNames('mb-2 ', {
          'text-gray-300': TOOLTIP_THEME[1] === theme,
        })}
      >
        {description}
      </p>
      <div className="flex space-x-3">
        <Button
          onClick={() => {
            if (actionObject.primaryButtonAction) actionObject.primaryButtonAction();
          }}
        >
          {actionObject.primaryButtonLabel}
        </Button>
        <Button
          variant="white"
          onClick={() => {
            if (actionObject.secondaryButtonAction) actionObject.secondaryButtonAction();
          }}
          wrapperClassName={classNames({
            'bg-gray-600 text-white outline-0': theme === TOOLTIP_THEME[1],
          })}
        >
          {actionObject.secondaryButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Layout;
