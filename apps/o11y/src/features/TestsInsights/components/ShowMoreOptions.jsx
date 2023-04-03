import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import { TT_PARAMS_MAPPING } from 'features/TestingTrends/constants';
import { setTTFilters } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
// import { getBuildMetaDataSelector } from 'testops/TestList/slices/selectors';
import { getTestingTrendPath } from 'utils/routeUtils';

// import '../styles/ShowMoreOptions.scss';

export default function ShowMoreOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const buildMeta = useSelector(getBuildMeta);
  // const buildNormalizedData = useSelector(getBuildNormalizedData);

  const handleClickViewTrends = () => {
    dispatch(
      setTTFilters({
        buildName: {
          label: buildMeta.name,
          value: buildMeta.name
        }
      })
    );
    navigate({
      pathname: getTestingTrendPath(projects.active.normalisedName),
      search: `${TT_PARAMS_MAPPING.ttActiveBuild}=${buildMeta.name}`
    });
  };
  return (
    // ti-more-options
    <div className="">
      <Button
        onClick={handleClickViewTrends}
        text="View Trends"
        size="small"
        type="subtle"
        variant="full"
      />
    </div>
  );
}
