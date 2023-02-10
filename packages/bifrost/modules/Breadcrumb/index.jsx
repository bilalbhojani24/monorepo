import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ChevronRightIcon } from '../Icon';

import { BREADCRUMB_SIZE } from './const/breadcrumbConstants';

import './styles.scss';

const isElement = (element) => React.isValidElement(element);

const Breadcrumb = (props) => {
  const {
    ChevronIcon,
    ChevronIconClass,
    data,
    onClick,
    size,
    wrapperClassName
  } = props;

  const handleClick = (e, clickedItem) => {
    e.preventDefault();
    onClick(e, clickedItem);
  };

  return (
    <nav
      className={twClassNames(
        'flex',
        {
          'border-b border-base-200 bg-slate-50':
            size === BREADCRUMB_SIZE.fullWidth
        },
        wrapperClassName
      )}
      aria-label="Breadcrumb"
    >
      <ol
        className={twClassNames('flex space-x-4', {
          'w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 items-center':
            size === BREADCRUMB_SIZE.fullWidth,
          'rounded-md bg-white shadow py-2 px-4':
            size === BREADCRUMB_SIZE.contained
        })}
      >
        {data.map((page, index) => (
          <li key={page.name}>
            <div
              className={twClassNames('flex', {
                'items-center': size === BREADCRUMB_SIZE.fullWidth
              })}
            >
              <div
                className={twClassNames({
                  hidden: index === 0
                })}
              >
                <ChevronIcon
                  className={twClassNames(
                    `h-5 w-5 flex-shrink-0 text-base-400 mr-2 ${ChevronIconClass}`
                  )}
                  aria-hidden="true"
                />
              </div>
              <a
                href={page.url}
                className="text-base-500 hover:text-base-700 flex text-sm font-medium"
                aria-current={page.current ? 'page' : undefined}
                onClick={(e) => handleClick(e, page)}
              >
                {page.icon && isElement(page.icon) && page.icon}
                {page.icon && !isElement(page.icon) && (
                  <img src={page.icon} alt={`icon-${page.label}`} />
                )}
                <span>{page.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  ChevronIcon: PropTypes.node,
  ChevronIconClass: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      current: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    })
  ),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(BREADCRUMB_SIZE)),
  wrapperClassName: PropTypes.string
};

Breadcrumb.defaultProps = {
  ChevronIcon: ChevronRightIcon,
  ChevronIconClass: '',
  data: [],
  onClick: () => {},
  size: 'full-width',
  wrapperClassName: ''
};

export default Breadcrumb;
