import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import VirtualisedTable from 'common/VirtualisedTable';
import { roundedTableHeaderHack } from 'constants/common';
import { getTrendBuildFrequencyData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import max from 'lodash/max';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

const TABLE_CLASSES = {
  ROW_CLASSES:
    'overflow-hidden border-b border-base-300 whitespace-normal break-words',
  HEADER_CLASSES: 'py-3 border-t border-base-300 text-xs font-medium z-[2]'
};

const BuildRunsList = React.memo(({ item, maxRunCount }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames(
        TABLE_CLASSES.ROW_CLASSES,
        'text-base-900 border-l border-l-base-300'
      )}
    >
      {item.buildName}
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        TABLE_CLASSES.ROW_CLASSES,
        'border-r border-r-base-300'
      )}
    >
      <div className="flex">
        <div
          className="mr-3 h-3 rounded-r-lg"
          style={{
            width: `${(item.runs / maxRunCount) * 100}%`,
            backgroundColor: '#865CC1'
          }}
        />
        <p className="shrink-0 pl-2">{abbrNumber(item.runs)}</p>
      </div>
    </O11yTableCell>
  </>
));

export default function BuildRunFreqTrend() {
  const filters = useSelector(getAllTTFilters);
  const [buildData, setBuildData] = useState({ data: [] });
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendBuildFrequencyData({
        normalisedName: projects.active?.normalisedName,
        filters
      })
    )
      .unwrap()
      .then((res) => {
        setBuildData(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      fetchData();
    }
  }, [fetchData, projects.active?.normalisedName]);

  const handleBottomChange = useCallback((state) => {
    setIsAtBottom(state);
  }, []);

  const containerRef = useRef(null);
  const maxRunCount = max(buildData?.data?.map(({ runs }) => runs));

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(buildData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="h-full flex-1">
          <VirtualisedTable
            data={buildData?.data}
            showFixedFooter={isAtBottom}
            tableWrapperClassName="bg-white border-separate border-spacing-0 table-fixed"
            tableContainerWrapperClassName="border-none overflow-visible overflow-x-visible bg-transparent ring-0 shadow-none rounded-none pb-6"
            customScrollParent={containerRef.current}
            itemContent={(index, singleBuildData) => (
              <BuildRunsList item={singleBuildData} maxRunCount={maxRunCount} />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow>
                <O11yTableCell
                  isSticky
                  wrapperClassName={twClassNames(
                    TABLE_CLASSES.HEADER_CLASSES,
                    'border-l border-l-base-300',
                    roundedTableHeaderHack.common,
                    roundedTableHeaderHack.left
                  )}
                >
                  BUILD NAME
                </O11yTableCell>
                <O11yTableCell
                  isSticky
                  wrapperClassName={twClassNames(
                    TABLE_CLASSES.HEADER_CLASSES,
                    'border-r border-r-base-300 text-right w-3/5',
                    roundedTableHeaderHack.common,
                    roundedTableHeaderHack.right
                  )}
                >
                  RUNS
                </O11yTableCell>
              </O11yTableRow>
            )}
            atBottomStateChange={handleBottomChange}
            handleRowClick={() => {}}
          />
        </div>
      )}
    </TrendStatesWrapper>
  );
}

BuildRunsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  maxRunCount: PropTypes.number.isRequired
};
