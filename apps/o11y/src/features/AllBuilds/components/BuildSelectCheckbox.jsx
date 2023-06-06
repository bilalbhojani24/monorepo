import React from 'react';
import { TooltipBody } from '@browserstack/bifrost';
import { O11yCheckbox, O11yTooltip } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import { CheckboxState, TEST_STATUS } from 'constants/common';
import { ARCHIVE_TOOLTIP_MESSAGES } from 'constants/staticTexts';
import PropTypes from 'prop-types';

import useBuildSelection from '../hooks/useBuildSelection';

function BuildSelectCheckbox({ data }) {
  const { getBuildCheckedStatus, setBuildCheckedStatus } = useBuildSelection();
  const buildStatus = data.status;

  const renderTooltipContent = () => {
    if (!buildStatus || buildStatus === TEST_STATUS.PENDING) {
      return (
        <TooltipBody>
          <span className="text-sm">
            {ARCHIVE_TOOLTIP_MESSAGES.RUNNING_SELECTION}
          </span>
        </TooltipBody>
      );
    }
    if (buildStatus === TEST_STATUS.ARCHIVED) {
      return (
        <TooltipBody>
          <span className="text-sm">{ARCHIVE_TOOLTIP_MESSAGES.ARCHIVED}</span>
        </TooltipBody>
      );
    }
    return null;
  };

  return (
    <PropagationBlocker className="py-4">
      <O11yTooltip
        placementSide="top"
        theme="dark"
        content={renderTooltipContent()}
      >
        <O11yCheckbox
          id={data.uuid}
          border={false}
          wrapperClassName="mr-4"
          disabled={
            !buildStatus ||
            buildStatus === TEST_STATUS.PENDING ||
            buildStatus === TEST_STATUS.ARCHIVED
          }
          checked={
            getBuildCheckedStatus({ uuid: data.uuid, buildStatus }) ===
            CheckboxState.CHECKED
          }
          onChange={({ target: { checked } }) => {
            setBuildCheckedStatus({ uuid: data.uuid, checked });
          }}
        />
      </O11yTooltip>
    </PropagationBlocker>
  );
}

BuildSelectCheckbox.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default React.memo(BuildSelectCheckbox);
