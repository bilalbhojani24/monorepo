import React from 'react';
import PropTypes from 'prop-types';

import { STACK_LIST_MODES } from './const/stackedListWSingleColumnConstants';

import './styles.scss';

const truncate = (str, length) =>
  str.length > length ? `${str.substring(0, length)}...` : str;

const StackedListWSingleColumn = ({
  descriptionMaxLength,
  list,
  handleListClick,
  variant,
  action
}) => {
  const handleClick = (e, listItem) => {
    e.preventDefault();
    handleListClick(listItem);
  };

  if (variant === STACK_LIST_MODES[0])
    return (
      <div>
        <div className="mt-6 flow-root">
          <ul className="divide-base-200 -my-5 divide-y">
            {list.map((listItem) => (
              <li key={listItem.id} className="py-5">
                <div className="focus-within:ring-brand-500 relative focus-within:ring-2">
                  <h3 className="text-base-800 text-sm font-semibold">
                    {listItem.link === undefined ? (
                      <>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {listItem.heading}
                      </>
                    ) : (
                      <a
                        href={listItem.link}
                        className="hover:underline focus:outline-none"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {listItem.heading}
                      </a>
                    )}
                  </h3>
                  <p className="text-base-600 mt-1 text-sm">
                    {listItem.preview}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">{action}</div>
      </div>
    );

  return (
    <ul className="divide-base-200 divide-y">
      {list.map((listItem) => (
        <li
          key={listItem.id}
          className="focus-within:ring-brand-600 hover:bg-base-50 relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a
                href="/"
                className="block focus:outline-none"
                onClick={(e) => handleClick(e, listItem)}
              >
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-base-900 text-sm font-medium">
                  {listItem.heading}
                </p>
                <p className="text-base-500 text-sm">{listItem.subHeading}</p>
              </a>
            </div>
            <time
              dateTime={listItem.datetime}
              className="text-base-500 shrink-0 whitespace-nowrap text-sm"
            >
              {listItem.textAside}
            </time>
          </div>
          <div className="mt-1">
            <p className="text-base-600  text-sm">
              {truncate(listItem.preview, descriptionMaxLength)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

StackedListWSingleColumn.propTypes = {
  descriptionMaxLength: PropTypes.number,
  handleListClick: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      heading: PropTypes.string,
      subHeading: PropTypes.string,
      preview: PropTypes.string,
      link: PropTypes.string,
      textAside: PropTypes.string
    })
  ),
  variant: PropTypes.string,
  action: PropTypes.node
};
StackedListWSingleColumn.defaultProps = {
  descriptionMaxLength: 150,
  handleListClick: () => {},
  list: [],
  variant: STACK_LIST_MODES[0],
  action: {}
};

export default StackedListWSingleColumn;
