import React from 'react';
import { TooltipBody } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { JiraArrowIcon } from 'assets/icons/components';
import { O11yButton, O11yTooltip } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import JiraTag from './JiraTag';

function JiraTagList({
  list,
  iconOnly,
  tagClickCb,
  wrapperClassName,
  showInToolTip
}) {
  if (!Array.isArray(list) || isEmpty(list)) {
    return null;
  }
  if (list?.length === 1 && !showInToolTip) {
    return (
      <JiraTag
        jiraUrl={list[0]?.url}
        iconOnly={iconOnly}
        tagClickCb={tagClickCb}
        status={list[0]?.status}
      />
    );
  }
  return (
    <O11yTooltip
      placementSide="top"
      content={
        <TooltipBody wrapperClassName=" max-h-[180px] overflow-auto flex flex-col items-start gap-2">
          {list.map((jira) => (
            <JiraTag
              key={jira.url}
              jiraUrl={jira.url}
              tagClickCb={tagClickCb}
              status={jira.status}
            />
          ))}
        </TooltipBody>
      }
    >
      <O11yButton
        colors="white"
        size="extra-small"
        icon={<JiraArrowIcon className="h-4 w-4" />}
        wrapperClassName={twClassNames(wrapperClassName, 'py-0.5 px-2 flex')}
      >
        {list?.length} Jira issue{list?.length > 1 ? 's' : ''}
      </O11yButton>
    </O11yTooltip>
  );
}

JiraTagList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagClickCb: PropTypes.func,
  iconOnly: PropTypes.bool,
  showInToolTip: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
JiraTagList.defaultProps = {
  iconOnly: false,
  tagClickCb: () => {},
  wrapperClassName: '',
  showInToolTip: false
};

export default JiraTagList;
