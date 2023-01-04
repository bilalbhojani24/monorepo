import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { STACK_LIST_MODES } from './const/stackedListWAvatarConstants';
import classNames from 'classnames';
import Button from '../Button';

const StackedListWAvatar = ({ list, format, action, avatarVisible, actionTitle }) => {
  if (format === STACK_LIST_MODES[0])
    return (
      <ul role="list" className="divide-y divide-base-200">
        {list.map((listItem) => (
          <li key={listItem.id} className="flex py-4">
            {avatarVisible && listItem.avatar}
            <div className={classNames({ 'ml-3': avatarVisible })}>
              <p className="text-sm font-medium text-base-900">{listItem.heading}</p>
              <p className="text-sm text-base-500">{listItem.subHeading}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  return (
    <div>
      <div className="mt-6 flow-root">
        <ul role="list" className="-my-5 divide-y divide-base-200">
          {list.map((listItem) => (
            <li key={listItem.id} className="py-4">
              <div className="flex items-center space-x-4">
                {avatarVisible && <div className="flex-shrink-0">{listItem.avatar}</div>}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-base-900">{listItem.heading}</p>
                  <p className="truncate text-sm text-base-500">{listItem.subHeading}</p>
                </div>
                <div>
                  <a
                    href={listItem.link}
                    className="inline-flex items-center rounded-full border border-base-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-base-700 shadow-sm hover:bg-base-50"
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
  action: null,
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
