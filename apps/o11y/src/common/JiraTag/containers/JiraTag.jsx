import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { JiraIcon } from 'assets/icons/components';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const generatedIssueName = (url) => url?.split('/')?.pop();

function JiraTag({ url, status, tagClickCb, wrapperClassName }) {
  const handleJiraLinkClick = () => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
    tagClickCb();
  };
  return (
    <>
      <O11yButton
        colors="white"
        size="extra-small"
        onClick={handleJiraLinkClick}
        wrapperClassName={twClassNames(wrapperClassName, 'py-1 px-2 flex')}
      >
        <span className="flex items-center gap-1">
          <JiraIcon className="h-4 w-4" />
          {generatedIssueName(url)}
          {status && (
            <O11yBadge
              hasRemoveButton={false}
              modifier="base"
              hasDot={false}
              isRounded={false}
              text={status}
              wrapperClassName="pointer-events-none"
            />
          )}
        </span>
      </O11yButton>
    </>
  );
}

JiraTag.propTypes = {
  url: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  tagClickCb: PropTypes.func,
  status: PropTypes.string
};

JiraTag.defaultProps = {
  tagClickCb: () => {},
  wrapperClassName: '',
  status: ''
};

export default React.memo(JiraTag);
