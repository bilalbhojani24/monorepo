import React from 'react';
import PropTypes from 'prop-types';

const ActionPanel = ({ title, content, description }) => {
  if (!title && !description && !content) return null;

  return (
    <div className="bg-base-50 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {title && (
          <h3 className="text-base-900 text-base font-semibold leading-6">
            {title}
          </h3>
        )}
        {description && (
          <div className="text-base-900 mt-2 max-w-xl text-sm">
            <p>{description}</p>
          </div>
        )}
        {content && <div className="mt-5">{content}</div>}
      </div>
    </div>
  );
};

ActionPanel.propTypes = {
  content: PropTypes.node,
  description: PropTypes.node,
  title: PropTypes.node
};
ActionPanel.defaultProps = {
  content: null,
  description: null,
  title: null
};

export default ActionPanel;
