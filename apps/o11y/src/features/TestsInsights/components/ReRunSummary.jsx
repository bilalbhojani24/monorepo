import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdNotInterested, MdOutlineNextPlan } from '@browserstack/bifrost';
import {
  O11yEmptyState,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import VirtualisedTable from 'common/VirtualisedTable';
import { MODAL_TYPES } from 'constants/modalTypes';
import { ROUTES } from 'constants/routes';
import {
  getBuildMeta,
  getBuildUUID
} from 'features/BuildDetails/slices/selectors';
import { getRerunStats } from 'features/TestsInsights/slices/selectors';
import { getRerunData } from 'features/TestsInsights/slices/testInsightsSlice';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';
import { abbrNumber } from 'utils/common';

import BigNumber from './BigNumber';

export default function ReRunSummary() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);

  const buildId = useSelector(getBuildUUID);
  const reRunStats = useSelector(getRerunStats);
  const buildMeta = useSelector(getBuildMeta);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRerunData({ buildId }));
  }, [buildId, dispatch]);

  const navigate = useNavigate();

  const handleClickSummaryRow = (id) => {
    const { id: runId } = reRunStats.data?.retryData[id];
    logInsightsInteractionEvent({
      interaction: 'rerun_summary_filter_applied'
    });
    applyTestListFilter({ query: `run=${runId}` });
  };

  const hasNoData = useMemo(
    () => isEmpty(reRunStats?.data) && !reRunStats?.isLoading,
    [reRunStats?.data, reRunStats?.isLoading]
  );

  const handleClickPlaceholderCTA = () => {
    if (buildMeta.reRun) {
      dispatch(
        toggleModal({
          version: MODAL_TYPES.rerun_test_modal,
          data: {
            buildId
          }
        })
      );
    } else {
      navigate(ROUTES.settings_re_run);
    }
  };

  if (reRunStats?.hasNetworkError) {
    return (
      <div className="flex h-full flex-col justify-center overflow-auto">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          mainIcon={
            <MdNotInterested className="text-danger-600 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Reload',
            onClick: () => dispatch(getRerunData({ buildId })),
            size: 'default'
          }}
        />
      </div>
    );
  }
  if (hasNoData) {
    return (
      <div className="flex h-full flex-col justify-center overflow-auto">
        <O11yEmptyState
          title="No Re-runs!"
          description="There were no re-runs in this build"
          mainIcon={
            <MdOutlineNextPlan className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: buildMeta?.reRun ? 'Re-run' : 'Configure',
            onClick: handleClickPlaceholderCTA,
            size: 'default'
          }}
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex h-80 flex-col">
      <BigNumber
        data={{
          count: reRunStats.data?.count || 0,
          meta: 'Tests passed after re-runs'
        }}
        config={{ noHover: true }}
      />
      <div className="h-full py-3">
        {reRunStats.data?.retryData?.length > 0 && (
          <VirtualisedTable
            data={reRunStats.data?.retryData}
            showFixedFooter={false}
            itemContent={(index, item) => (
              <>
                <O11yTableCell wrapperClassName="text-base-900 whitespace-normal break-normal">
                  {item.label}
                </O11yTableCell>
                <O11yTableCell wrapperClassName="text-base-900">
                  {abbrNumber(item.passed || 0)}
                </O11yTableCell>
                <O11yTableCell wrapperClassName="text-base-900">
                  {abbrNumber(item.failed || 0)}
                </O11yTableCell>
                <O11yTableCell wrapperClassName="text-base-900">
                  {abbrNumber(item.skipped || 0)}
                </O11yTableCell>
                <O11yTableCell wrapperClassName="text-base-900">
                  {abbrNumber(item.total || 0)}
                </O11yTableCell>
              </>
            )}
            fixedHeaderContent={() => (
              <O11yTableRow>
                <O11yTableCell wrapperClassName="py-3 uppercase font-medium text-xs">
                  Runs
                </O11yTableCell>
                <O11yTableCell wrapperClassName="py-3 uppercase font-medium text-xs">
                  Passed
                </O11yTableCell>
                <O11yTableCell wrapperClassName="py-3 uppercase font-medium text-xs">
                  Failed
                </O11yTableCell>
                <O11yTableCell wrapperClassName="py-3 uppercase font-medium text-xs">
                  Skipped
                </O11yTableCell>
                <O11yTableCell wrapperClassName="py-3 uppercase font-medium text-xs">
                  Total
                </O11yTableCell>
              </O11yTableRow>
            )}
            handleRowClick={handleClickSummaryRow}
          />
        )}
      </div>
    </div>
  );
}
