import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yAccordian, O11yTooltip } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import StackTraceTooltip from 'common/StackTraceTooltip';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import SnpErrorBreakdown from '../components/ErrorBreakdown';
import { UNIQUE_ERROR_MAIN_HEADER } from '../constants';
import { getSnPUEBreakdownData } from '../slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSnpErrorsSortBy,
  getSnPTestFilterByKey
} from '../slices/selectors';

export default function UniqueErrorRow({ data }) {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const activeBuild = useSelector((state) =>
    getSnPTestFilterByKey(state, 'buildName')
  );
  const [breakDownData, setBreakDownData] = useState([]);
  const [isLoadingBD, setIsLoadingBD] = useState(true);
  const filters = useSelector(getAllSnPTestFilters);
  const sortBy = useSelector(getSnpErrorsSortBy);

  const fetchBreakDownData = () => {
    setIsLoadingBD(true);
    dispatch(
      getSnPUEBreakdownData({
        normalisedName: activeProject?.normalisedName,
        errorId: data.id,
        activeBuild: activeBuild.value,
        filters,
        sortOptions: sortBy
      })
    )
      .unwrap()
      .then((res) => {
        setBreakDownData(res);
      })
      .finally(() => {
        setIsLoadingBD(false);
      });
  };

  return (
    <>
      <O11yAccordian
        triggerClassName="pl-5 pt-0 bg-white flex items-center hover:bg-brand-50 rounded-b-md"
        triggerContentNode={
          <>
            <div
              className={twClassNames(
                UNIQUE_ERROR_MAIN_HEADER.error.bodyClass,
                'pl-1 pr-4'
              )}
            >
              <div className="flex-1 truncate">
                <O11yTooltip
                  triggerWrapperClassName="max-w-full truncate"
                  content={
                    <StackTraceTooltip
                      traceLines={data?.error || []}
                      copyText={data?.error?.join('\n')}
                    />
                  }
                  wrapperClassName="p-1 shadow-lg"
                  placementSide="bottom"
                  placementAlign="start"
                  size="lg"
                  arrowWidth={0}
                  arrowHeight={0}
                  sideOffset={2}
                >
                  <span className="text-base-900 text-sm font-medium leading-5">
                    {data?.error?.[0]}
                  </span>
                </O11yTooltip>
              </div>
            </div>
            <div
              className={twClassNames(
                UNIQUE_ERROR_MAIN_HEADER.testCount.bodyClass
              )}
            >
              <p className="text-base-500 text-sm leading-5">
                {data.impactedTests ? data.impactedTests : '-'}
              </p>
            </div>
            <div
              className={twClassNames(
                UNIQUE_ERROR_MAIN_HEADER.errorCount.bodyClass,
                'flex items-center gap-4'
              )}
            >
              <div className="mr-3 h-5 w-12">
                <MiniChart data={data.chartData} chartType="area" />
              </div>
              <p className="text-base-500 text-sm leading-5">
                {data.errorCount ? data.errorCount : '-'}
              </p>
            </div>
          </>
        }
        panelContentNode={
          <div className="overflow-hidden rounded-b-md">
            <SnpErrorBreakdown
              errorId={data.id}
              isLoading={isLoadingBD}
              data={breakDownData}
            />
          </div>
        }
        onTriggerClick={() => {
          if (!breakDownData.length) {
            fetchBreakDownData();
          }
        }}
      />
    </>
  );
}

UniqueErrorRow.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
