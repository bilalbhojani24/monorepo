import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdError } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { getProjectBuildsPath } from 'utils/routeUtils';

import { getBuildMeta } from '../slices/selectors';

function BuildParsingFailure() {
  const buildMeta = useSelector(getBuildMeta);
  const navigate = useNavigate();
  const activeProject = useSelector(getActiveProject);

  const handleClickGoToAllBuilds = () => {
    navigate(getProjectBuildsPath(encodeURI(activeProject.normalisedName)));
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="max-w-md flex-col text-center">
        <O11yEmptyState
          title="Report parsing failed"
          description={
            buildMeta?.data?.buildError?.message ||
            'Something went wrong while fetching data'
          }
          mainIcon={
            <MdError className="text-danger-500 inline-block !h-9 !w-9" />
          }
          buttonProps={{
            children: 'Go to all builds',
            onClick: handleClickGoToAllBuilds,
            size: 'default'
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(BuildParsingFailure);
