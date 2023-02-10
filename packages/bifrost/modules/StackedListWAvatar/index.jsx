import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';

import { STACK_LIST_MODES } from './const/stackedListWAvatarConstants';

import './styles.scss';

const StackedListWAvatar = ({
  list,
  format,
  action,
  avatarVisible,
  actionTitle
}) => {
  if (format === STACK_LIST_MODES[0])
    return (
      <ul role="list" className="divide-base-200 divide-y">
        {list.map((listItem) => (
          <li key={listItem.id} className="flex py-4">
            {avatarVisible && listItem.avatar}
            <div className={twClassNames({ 'ml-3': avatarVisible })}>
              <p className="text-base-900 text-sm font-medium">
                {listItem.heading}
              </p>
              <p className="text-base-500 text-sm">{listItem.subHeading}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  return (
    <div>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-base-200 -my-5 divide-y">
          {list.map((listItem) => (
            <li key={listItem.id} className="py-4">
              <div className="flex items-center space-x-4">
                {avatarVisible && (
                  <div className="shrink-0">{listItem.avatar}</div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-base-900 truncate text-sm font-medium">
                    {listItem.heading}
                  </p>
                  <p className="text-base-500 truncate text-sm">
                    {listItem.subHeading}
                  </p>
                </div>
                <div>
                  <a
                    href={listItem.link}
                    className="border-base-300 text-base-700 hover:bg-base-50 inline-flex items-center rounded-full border bg-white px-2.5 py-0.5 text-sm font-medium leading-5 shadow-sm"
                  >
                    {listItem.textAside}
                  </a>
                </div>
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
};

StackedListWAvatar.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      heading: PropTypes.string,
      subHeading: PropTypes.string,
      link: PropTypes.string,
      textAside: PropTypes.string,
      avatar: PropTypes.node
    })
  ),
  format: PropTypes.string,
  action: PropTypes.shape({}),
  avatarVisible: PropTypes.bool,
  actionTitle: PropTypes.string
};
StackedListWAvatar.defaultProps = {
  list: [],
  format: '',
  avatarVisible: true,
  action: {
    title: 'View',
    variant: '',
    buttonType: '',
    wrapperClassName: '',
    onClick: () => {}
  },
  actionTitle: 'Demo'
};

export default StackedListWAvatar;
