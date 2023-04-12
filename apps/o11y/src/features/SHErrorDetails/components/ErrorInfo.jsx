import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from '@browserstack/bifrost';
import { O11yTooltip } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import StackTraceTooltip from 'common/StackTraceTooltip';
import { getActiveProject } from 'globalSlice/selectors';

import { getSnPErrorDetailsErrorCountData } from '../slices/dataSlice';
import {
  getShowUEDetailsFor,
  getUECbtInfo,
  getUEDetailsInfo
} from '../slices/selectors';

const ErrorInfo = () => {
  const dispatch = useDispatch();
  const mounted = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorData, setErrorData] = useState({});
  const activeProject = useSelector(getActiveProject);
  const { testId, errorId } = useSelector(getShowUEDetailsFor);
  const cbtInfo = useSelector(getUECbtInfo);
  const errorDetailsInfo = useSelector(getUEDetailsInfo);
  useEffect(() => {
    mounted.current = true;
    if (testId && errorId && activeProject?.normalisedName) {
      setIsLoadingData(true);
      dispatch(
        getSnPErrorDetailsErrorCountData({
          normalisedName: activeProject?.normalisedName,
          testId,
          errorId,
          cbtInfo
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setErrorData(res);
          }
        })
        .finally(() => {
          if (mounted.current) {
            setIsLoadingData(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [cbtInfo, dispatch, errorId, activeProject?.normalisedName, testId]);

  if (isLoadingData) {
    return null;
  }
  return (
    <div className="mb-6 flex items-center gap-6">
      <div className="bg-danger-50 flex-1 rounded-md p-4 pb-6">
        <div className="flex items-center gap-3">
          <MdCancel className="text-danger-400 h-4 w-4" />
          <span className="text-danger-800 text-sm font-medium">Error</span>
        </div>
        <O11yTooltip
          triggerWrapperClassName="max-w-full ml-7 line-clamp-2 text-danger-700 text-sm font-normal leading-5"
          content={
            <StackTraceTooltip
              traceLines={errorDetailsInfo?.data?.error || []}
              copyText={errorDetailsInfo?.data?.error?.join('\n')}
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
          {errorDetailsInfo?.data?.error?.[0]}
        </O11yTooltip>
      </div>
      <div className="p-6">
        <div className="flex flex-col">
          <span className="text-base-900 text-base font-normal leading-6">
            Error count
          </span>
          <div className="flex items-center gap-4">
            <div className="h-5 w-12">
              <MiniChart
                data={errorData.chartData}
                chartType="area"
                color="var(--colors-danger-100)"
                lineColor="var(--colors-danger-400)"
              />
            </div>
            <span className="text-base-700 text-2xl font-semibold leading-8">
              {errorData?.errorCount?.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorInfo.propTypes = {};

export default ErrorInfo;
