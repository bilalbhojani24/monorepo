import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { ChevronRightIcon } from '../Icon';
import { STACK_LIST_MODES } from './const/stackedListWTwoColumnsConstants';
import Badge from '../Badge';

const StackedListWTwoColumns = ({ list, format, badgeProps, avatarVisible }) => {
  switch (format) {
    case STACK_LIST_MODES[0]:
      return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id}>
                <a href={listItem.link} className="block hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center">
                      {avatarVisible && <div className="flex-shrink-0">{listItem.avatar}</div>}
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="truncate text-sm font-medium">{listItem.firstColumn.heading}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            {listItem.firstColumn.metaNode}
                            <span className="truncate">{listItem.firstColumn.subHeading}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">{listItem.secondColumn.heading}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {listItem.secondColumn.metaNode}
                              {listItem.stage}
                              <span className="truncate">{listItem.secondColumn.subHeading}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    case STACK_LIST_MODES[1]:
      return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id}>
                <a href={listItem.link} className="block hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="truncate font-medium">{listItem.firstColumn.heading}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            {listItem.firstColumn.metaNode}
                            <p>{listItem.firstColumn.subHeading}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        {avatarVisible && <div className="flex -space-x-1 overflow-hidden">{listItem.avatar}</div>}
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    case STACK_LIST_MODES[2]:
      return (
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {list.map((listItem) => (
              <li key={listItem.id}>
                <a href={listItem.link} className="block hover:bg-gray-50 cursor-pointer">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-indigo-600">{listItem.firstColumn.heading}</p>
                      <div className="ml-2 flex flex-shrink-0">
                        <Badge {...badgeProps} text={listItem.secondColumn.heading} />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">{avatarVisible && listItem.avatar}</div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {listItem.secondColumn.metaNode}
                        <p>{listItem.secondColumn.subHeading}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

StackedListWTwoColumns.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstColumn: PropTypes.shape({
        heading: PropTypes.string,
        subHeading: PropTypes.string,
        metaNode: PropTypes.node,
      }),
      asideData: PropTypes.shape({
        heading: PropTypes.string,
        subHeading: PropTypes.string,
        metaNode: PropTypes.node,
      }),
      href: PropTypes.string,
      avatar: PropTypes.node,
    })
  ),
  format: PropTypes.string,
  badgeProps: PropTypes.shape({}),
  avatarVisible: PropTypes.bool,
};

StackedListWTwoColumns.defaultProps = {
  list: [],
  format: STACK_LIST_MODES[0],
  badgeProps: {},
  avatarVisible: true,
};

export default StackedListWTwoColumns;
