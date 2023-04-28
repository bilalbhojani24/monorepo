import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
  const {
    sidebarHeader,
    sidebarPrimaryNavigation,
    sidebarSecondaryNavigation,
    wrapperClassName
  } = props;

  return (
    <div
      className={twClassNames(
        'flex min-h-0 flex-1 flex-col space-y-2 border-r border-base-200 px-2 pt-5 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col',
        wrapperClassName
      )}
    >
      <div className="flex flex-1 flex-col space-y-5 overflow-y-auto pb-2">
        {sidebarHeader}

        {sidebarPrimaryNavigation ? (
          <div className="flex flex-1 flex-col overflow-y-auto">
            {sidebarPrimaryNavigation}
          </div>
        ) : null}
      </div>

      {sidebarSecondaryNavigation ? (
        <div className="flex shrink-0 flex-col pb-2">
          {sidebarSecondaryNavigation}
        </div>
      ) : null}
    </div>
  );
};

Sidebar.propTypes = {
  sidebarHeader: PropTypes.node,
  sidebarPrimaryNavigation: PropTypes.node,
  sidebarSecondaryNavigation: PropTypes.node,
  wrapperClassName: PropTypes.string
};
Sidebar.defaultProps = {
  sidebarHeader: null,
  sidebarPrimaryNavigation: null,
  sidebarSecondaryNavigation: null,
  wrapperClassName: ''
};

export default Sidebar;
