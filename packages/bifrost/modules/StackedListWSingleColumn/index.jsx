import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { STACK_LIST_MODES } from './const/stackedListWSingleColumnConstants.js';
import Button from '../Button';

const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

const StackedListWSingleColumn = ({ descriptionMaxLength, list, handleListClick, format, action, actionTitle }) => {
  const handleClick = (e, listItem) => {
    e.preventDefault();
    handleListClick(listItem);
  };

  if (format === STACK_LIST_MODES[0])
    return (
      <div>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="text-sm font-semibold text-gray-800">
                    <a href={listItem.link} className="hover:underline focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {listItem.heading}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{listItem.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button {...action}>{actionTitle}</Button>
        </div>
      </div>
    );

  return (
    <ul className="divide-y divide-gray-200">
      {list.map((listItem) => (
        <li
          key={listItem.id}
          className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a href="/" className="block focus:outline-none" onClick={(e) => handleClick(e, listItem)}>
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{listItem.heading}</p>
                <p className="text-sm text-gray-500">{listItem.subHeading}</p>
              </a>
            </div>
            <time dateTime={listItem.datetime} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
              {listItem.textAside}
            </time>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600 line-clamp-2">{truncate(listItem.preview, descriptionMaxLength)}</p>
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
      textAside: PropTypes.string,
    })
  ),
  format: PropTypes.string,
  action: PropTypes.shape({}),
  actionTitle: PropTypes.string,
};
StackedListWSingleColumn.defaultProps = {
  descriptionMaxLength: 150,
  handleListClick: () => {},
  list: [],
  format: STACK_LIST_MODES[0],
  action: {
    title: 'View',
    variant: '',
    buttonType: '',
    wrapperClassName: '',
    onClick: () => {},
  },
  actionTitle: 'Demo',
};

export default StackedListWSingleColumn;
