import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const StackedListWStickyHeadings = ({ list, avatarVisible }) => {
  return (
    <nav className="h-full overflow-y-auto" aria-label="list">
      {list.map((listItem) => (
        <div key={listItem.heading} className="relative">
          <div className="sticky top-0 z-10 border-t border-b border-base-200 bg-base-50 px-6 py-1 text-sm font-medium text-base-500">
            <h3>{listItem.heading}</h3>
          </div>
          <ul role="list" className="relative z-0 divide-y divide-base-200">
            {listItem.contents.map((listItemContent) => (
              <li key={listItemContent.id} className="bg-white">
                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-500 hover:bg-base-50">
                  <div className="flex-shrink-0">{avatarVisible && listItemContent.avatar}</div>
                  <div className="min-w-0 flex-1">
                    <a href={listItemContent.link} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-base-900">{listItemContent.title}</p>
                      <p className="truncate text-sm text-base-500">{listItemContent.subTitle}</p>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

StackedListWStickyHeadings.propTypes = {
  avatarVisible: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      contents: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          subTitle: PropTypes.string,
          avatar: PropTypes.node,
          link: PropTypes.string
        })
      )
    })
  )
};
StackedListWStickyHeadings.defaultProps = {
  avatarVisible: true,
  list: {}
};

export default StackedListWStickyHeadings;
