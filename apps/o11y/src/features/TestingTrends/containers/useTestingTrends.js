import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, setStorage } from '@browserstack/utils';
import {
  TREND_CARDS,
  TREND_CARDS_LAYOUT
} from 'features/TestingTrends/constants';
import { getActiveProject } from 'globalSlice/selectors';
import { keyBy, merge, values } from 'lodash';
import { logOllyEvent } from 'utils/common';

const RGL_LS_KEY = 'testops-trends-layouts-v3';
const RGL_LS_KEY_OLDER = 'testops-trends-layouts-v2';
const useTestingTrends = () => {
  const activeProject = useSelector(getActiveProject);
  const getMergedLayoutValue = (obj1, obj2) => {
    const breakPoints = ['md', 'lg', 'sm', 'xs', 'xxs'];
    const mergedObj = {};
    breakPoints.forEach((bp) => {
      if (obj1[bp].length && obj2[bp].length) {
        const arr1 = obj1[bp];
        const arr2 = obj2[bp];
        mergedObj[bp] = values(merge(keyBy(arr1, 'i'), keyBy(arr2, 'i')));
      } else if (obj1[bp].length) {
        mergedObj[bp] = obj1[bp];
      } else if (obj2[bp].length) {
        mergedObj[bp] = obj2[bp];
      }
    });
    return mergedObj;
  };

  const [rglLayouts, setRglLayouts] = useState(() => {
    localStorage.removeItem(RGL_LS_KEY_OLDER);
    return getStorage(RGL_LS_KEY)
      ? getMergedLayoutValue(TREND_CARDS_LAYOUT, getStorage(RGL_LS_KEY))
      : TREND_CARDS_LAYOUT;
  });

  const logTrendsInteractionEvent = ({ interaction }) => {
    logOllyEvent({
      event: 'O11yTestingTrendsInteracted',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        interaction
      }
    });
  };

  const onLayoutChange = (_, layouts) => {
    setStorage(RGL_LS_KEY, layouts);
    setRglLayouts(layouts);
  };

  const handleResize = () => {
    window.dispatchEvent(new Event('resize'));
    logTrendsInteractionEvent({ interaction: 'chart_resized' });
  };

  useEffect(() => {
    logOllyEvent({
      event: 'O11yTestingTrendsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject.id, activeProject.name]);

  return {
    getMergedLayoutValue,
    handleResize,
    logTrendsInteractionEvent,
    onLayoutChange,
    rglLayouts,
    TREND_CARDS
  };
};

export default useTestingTrends;
