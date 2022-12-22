import React from 'react';
import PropTypes from 'prop-types';
import { messages } from './const/stackedListConstant';
import './styles.scss';

const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

const StackedList = (props) => {
  const { descriptionMaxLength, list, handleListClick } = props;

  const handleClick = (e, message) => {
    e.preventDefault();
    handleListClick(message);
  };

  return (
    <ul className="divide-y divide-gray-200">
      {list.map((message) => (
        <li
          key={message.id}
          className="relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <a href="/" className="block focus:outline-none" onClick={(e) => handleClick(e, message)}>
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{message.heading}</p>
                <p className="text-sm text-gray-500">{message.subHeading}</p>
              </a>
            </div>
            <time dateTime={message.datetime} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
              {message.textAside}
            </time>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600 line-clamp-2">{truncate(message.preview, descriptionMaxLength)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

StackedList.propTypes = {
  descriptionMaxLength: PropTypes.number,
  handleListClick: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      heading: PropTypes.string,
      subHeading: PropTypes.string,
      preview: PropTypes.string,
      textAside: PropTypes.string
    })
  )
};
StackedList.defaultProps = {
  descriptionMaxLength: 150,
  handleListClick: () => {},
  list: messages
};

export default StackedList;
