import React from 'react';
import classNames from 'classnames';

import Button from '../../Button';
import Hyperlink from '../../Hyperlink';
import { BUTTON_TYPE, TOOLTIP_THEME } from '../const';

const Layout = ({ actionObject, buttonType, description, title, theme }) => {
  console.log(actionObject);
  return (
    <div
      className={classNames('max-w-xs rounded-md p-3 shadow', {
        'bg-white ': TOOLTIP_THEME[0] === theme,
        'bg-base-800': TOOLTIP_THEME[1] === theme,
      })}
    >
      <p
        className={classNames('mb-2 font-semibold', {
          'text-white': TOOLTIP_THEME[1] === theme,
        })}
      >
        {title}
      </p>
      <p
        className={classNames('mb-2 ', {
          'text-base-300': TOOLTIP_THEME[1] === theme,
        })}
      >
        {description}
      </p>
      <div className="flex space-x-3">
        {buttonType === BUTTON_TYPE[0] ? (
          <>
            <Button
              onClick={() => {
                if (actionObject.primaryButtonAction)
                  actionObject.primaryButtonAction();
              }}
            >
              {actionObject.primaryButtonLabel}
            </Button>
            <Button
              variant="white"
              onClick={() => {
                if (actionObject.secondaryButtonAction)
                  actionObject.secondaryButtonAction();
              }}
              wrapperClassName={classNames({
                'bg-base-600 text-white outline-0': theme === TOOLTIP_THEME[1],
              })}
            >
              {actionObject.secondaryButtonLabel}
            </Button>
          </>
        ) : (
          <>
            <Hyperlink
              underlined
              fontWeight="font-light"
              color={
                TOOLTIP_THEME[0] === theme ? 'text-brand-600' : 'text-white'
              }
              wrapperClassName={classNames('mr-4')}
              href={actionObject.primaryButtonUrl}
              rel="noreferrer noopener"
            >
              {actionObject.primaryButtonLabel}
            </Hyperlink>
            <Hyperlink
              underlined
              fontWeight="font-light"
              color={
                TOOLTIP_THEME[0] === theme ? 'text-brand-600' : 'text-white'
              }
              href={actionObject.secondaryButtonUrl}
              rel="noreferrer noopener"
            >
              {actionObject.secondaryButtonLabel}
            </Hyperlink>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
