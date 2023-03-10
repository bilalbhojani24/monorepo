import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { JiraIcon } from 'assets/icons/components';
import PropTypes from 'prop-types';

const generatedIssueName = (url) => url.split('/').pop();

function JiraTag({ jiraUrl, tagClickCb, wrapperClassName, iconOnly }) {
  const handleJiraLinkClick = () => {
    window.open(jiraUrl, '_blank', 'noopener,noreferrer');
    tagClickCb();
  };
  return (
    <button
      className={twClassNames(
        'border border-base-300 px-1 flex items-center rounded',
        wrapperClassName
      )}
      onClick={handleJiraLinkClick}
      type="button"
    >
      <JiraIcon className="h-4 w-4" />
      <span className="text-xs font-semibold">
        {iconOnly ? '' : generatedIssueName(jiraUrl)}
      </span>
    </button>
  );
}

JiraTag.propTypes = {
  jiraUrl: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  tagClickCb: PropTypes.func,
  iconOnly: PropTypes.bool
};

JiraTag.defaultProps = {
  tagClickCb: () => {},
  wrapperClassName: '',
  iconOnly: false
};

export default React.memo(JiraTag);
