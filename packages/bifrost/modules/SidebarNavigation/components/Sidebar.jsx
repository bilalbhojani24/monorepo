import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../styles.scss';

const Sidebar = (props) => {
  const {
    sidebarHeader,
    sidebarPrimaryNavigation,
    sidebarSecondaryNavigation,
    wrapperClass,
  } = props;

  return (
    <div
      className={classNames(
        'flex min-h-0 flex-1 flex-col space-y-2 border-r border-base-200 px-1 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col ',
        wrapperClass,
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto pb-2">
        {sidebarHeader}

        {sidebarPrimaryNavigation ? (
          <div className="flex flex-1 flex-col overflow-y-auto pb-2">
            {sidebarPrimaryNavigation}
          </div>
        ) : null}
      </div>

      {sidebarSecondaryNavigation ? (
        <div className="flex shrink-0 flex-col px-1">
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
  wrapperClass: PropTypes.string,
};
Sidebar.defaultProps = {
  sidebarHeader: null,
  sidebarPrimaryNavigation: null,
  sidebarSecondaryNavigation: null,
  wrapperClass: '',
};

export default Sidebar;
