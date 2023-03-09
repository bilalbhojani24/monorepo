import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import useWindowSize from '../../../hooks/src/useWindowSize';
import Tooltip from '../Tooltip';

const SidebarNavigationWCollapse = ({
  wrapperClassName,
  sidebarPrimaryNavigation,
  sidebarSecondaryNavigation,
  onClick,
  collapsedCutoff
}) => {
  const handleClick = (e, item) => {
    e.preventDefault();
    onClick(e, item);
  };

  const viewPortDimensions = useWindowSize();

  return (
    <div
      className={twClassNames(
        'flex min-h-0 flex-1 flex-col space-y-2 border-r border-base-200 px-2 pt-6 fixed inset-y-0 flex w-64 flex-col',
        {
          'px-1 w-fit': viewPortDimensions.width < collapsedCutoff
        },
        wrapperClassName
      )}
    >
      <div className="flex flex-1 flex-col space-y-5 overflow-y-auto pb-2">
        {sidebarPrimaryNavigation && (
          <div className="flex flex-1 flex-col overflow-y-auto">
            {sidebarPrimaryNavigation.map((item) => (
              <React.Fragment key={item.id}>
                <div className="mt-1">
                  {viewPortDimensions.width < collapsedCutoff ? (
                    <Tooltip
                      theme="dark"
                      content={
                        <p className="px-4 text-sm leading-5 text-white">
                          {item.label}
                        </p>
                      }
                    >
                      <button
                        onClick={(e) => handleClick(e, item)}
                        type="button"
                        className={twClassNames(
                          'w-full text-base-600 hover:bg-base-50 hover:text-base-900 flex items-center justify-items-start rounded-md p-2 text-sm font-medium',
                          {
                            'bg-base-100 text-base-900': item.active
                          }
                        )}
                      >
                        {item.icon}
                      </button>
                    </Tooltip>
                  ) : (
                    <button
                      onClick={(e) => handleClick(e, item)}
                      type="button"
                      className={twClassNames(
                        'w-full text-base-600 hover:bg-base-50 hover:text-base-900 flex items-center justify-items-start rounded-md p-2 text-sm font-medium',
                        {
                          'bg-base-100 text-base-900': item.active
                        }
                      )}
                    >
                      {item.icon}
                      <div className="text-base-900 ml-4 text-sm font-medium leading-5">
                        {item.label}
                      </div>
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {sidebarSecondaryNavigation && (
        <div className="flex shrink-0 flex-col pb-2">
          {sidebarSecondaryNavigation.map((item) => (
            <React.Fragment key={item.id}>
              <div className="mt-1">
                {viewPortDimensions.width < collapsedCutoff ? (
                  <Tooltip
                    theme="dark"
                    content={
                      <p className="px-4 text-sm leading-5 text-white">
                        {item.label}
                      </p>
                    }
                  >
                    <button
                      type="button"
                      onClick={(e) => handleClick(e, item)}
                      className={twClassNames(
                        'w-full text-base-600 flex items-center justify-items-start rounded-md p-2 text-sm font-medium',
                        {
                          'bg-base-100 text-base-900': item.active
                        }
                      )}
                    >
                      {item.icon}
                    </button>
                  </Tooltip>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, item)}
                    className={twClassNames(
                      'w-full text-base-600 flex items-center justify-items-start rounded-md p-2 text-sm font-medium',
                      {
                        'bg-base-100 text-base-900': item.active
                      }
                    )}
                  >
                    {item.icon}
                    <div className="text-base-600 ml-4 text-sm font-medium leading-5">
                      {item.label}
                    </div>
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

SidebarNavigationWCollapse.propTypes = {
  sidebarPrimaryNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node,
      path: PropTypes.string
    })
  ),
  sidebarSecondaryNavigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      icon: PropTypes.node,
      path: PropTypes.string
    })
  ),
  wrapperClassName: PropTypes.string,
  collapsedCutoff: PropTypes.number.isRequired,
  onClick: PropTypes.func
};
SidebarNavigationWCollapse.defaultProps = {
  wrapperClassName: '',
  sidebarPrimaryNavigation: [],
  sidebarSecondaryNavigation: [],
  onClick: () => {}
};

export default SidebarNavigationWCollapse;
