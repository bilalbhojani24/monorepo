import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import { TT_PARAMS_MAPPING } from 'features/TestingTrends/constants';
import { setTTFilters } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { getTestingTrendPath } from 'utils/routeUtils';

export default function useShowMoreOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const buildMeta = useSelector(getBuildMeta);

  return () => {
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
}
