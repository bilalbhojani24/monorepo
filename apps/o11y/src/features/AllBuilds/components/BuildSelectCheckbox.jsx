import React from 'react';
import { TooltipBody } from '@browserstack/bifrost';
import { O11yCheckbox, O11yTooltip } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import { CheckboxState, TEST_STATUS } from 'constants/common';
import PropTypes from 'prop-types';
import { getBuildMarkedStatus } from 'utils/common';

import useBuildSelection from '../hooks/useBuildSelection';

function BuildSelectCheckbox({ data }) {
  const { getBuildCheckedStatus, setBuildCheckedStatus } = useBuildSelection();
  const buildStatus = getBuildMarkedStatus(data.status, data.statusStats);
  return (
    <PropagationBlocker className="py-4">
      <O11yTooltip
        placementSide="top"
        theme="dark"
        content={
          buildStatus === TEST_STATUS.PENDING ? (
            <TooltipBody>
              <span className="text-sm">Running build cannot be archived</span>
            </TooltipBody>
          ) : null
        }
      >
        <O11yCheckbox
          border={false}
          wrapperClassName="mr-4"
          disabled={buildStatus === TEST_STATUS.PENDING}
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
