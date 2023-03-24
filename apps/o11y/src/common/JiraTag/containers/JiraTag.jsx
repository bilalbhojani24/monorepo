import React from 'react';
import { JiraIcon } from 'assets/icons/components';
import TagsComponent from 'common/TagsComponent';
import PropTypes from 'prop-types';

const generatedIssueName = (url) => url.split('/').pop();

function JiraTag({ jiraUrl, tagClickCb, wrapperClassName, iconOnly }) {
  const handleJiraLinkClick = () => {
    if (!jiraUrl) return;
    window.open(jiraUrl, '_blank', 'noopener,noreferrer');
    tagClickCb();
  };
  return (
    <TagsComponent
      wrapperClassName={wrapperClassName}
      tagClickCb={handleJiraLinkClick}
      iconOnly={iconOnly}
      text={generatedIssueName(jiraUrl)}
      icon={<JiraIcon className="h-3 w-3" />}
    />
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
