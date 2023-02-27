import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const SidebarHeader = ({
  brandImage,
  brandImageClass,
  brandImageContainerClass,
  children
}) => (
  <>
    {brandImage?.length ? (
      <div
        className={twClassNames(
          'flex flex-shrink-0 items-center px-2',
          brandImageContainerClass
        )}
      >
        <img
          className={twClassNames('h-8 w-auto', brandImageClass)}
          src={brandImage}
          alt="sidebar-nav-icon"
        />
      </div>
    ) : null}
    {children && <div className="px-1">{children}</div>}
  </>
);

SidebarHeader.propTypes = {
  brandImage: PropTypes.string,
  brandImageClass: PropTypes.string,
  brandImageContainerClass: PropTypes.string,
  children: PropTypes.node
};

SidebarHeader.defaultProps = {
  brandImage: '',
  brandImageClass: '',
  brandImageContainerClass: '',
  children: null
};

export default SidebarHeader;
