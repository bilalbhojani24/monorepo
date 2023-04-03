/* eslint-disable tailwindcss/no-custom-classname */
import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdBarChart, MdNotInterested } from '@browserstack/bifrost';
import {
  O11yEmptyState,
  O11yHyperlink,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import VirtualisedTable from 'common/VirtualisedTable';
import { DOC_LINKS } from 'constants/common';
import { ROUTES } from 'constants/routes';
// import { portalize } from 'testops/_utils/portalize';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import ReRunTriggerModal from 'testops/TestList/components/ReRunTriggerModal';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
// import {
//   getBuildMetaDataSelector
// } from 'testops/TestList/slices/selectors';
// import { setShowReRunModal } from 'testops/TestList/slices/uiSlice';
// import { OpenInNewIcon } from 'trike/Icons';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
// import 'images/testops/icons/no-data-rerun.svg';
// import { getRerunStats } from '../slices/selectors';
import { getRerunData } from 'features/TestsInsights/slices/testInsightsSlice';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';
import { abbrNumber } from 'utils/common';

import BigNumber from './BigNumber';

export default function ReRunSummary() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const buildId = useSelector(getBuildUUID);
  const reRunStats = {}; // useSelector(getRerunStats);
  const buildMeta = {}; // useSelector(getBuildMetaDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRerunData({ buildId }));
  }, [buildId, dispatch]);

  const navigate = useNavigate();

  const handleClickSummaryRow = (id) => {
    logInsightsInteractionEvent({
      interaction: 'rerun_summary_filter_applied'
    });

    // Clearing test runs before landing on test listing to fetch new tests based on applied filter
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    const searchString = `?tab=tests&run=${id}`;
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
  };

  const hasNoData = useMemo(
    () => isEmpty(reRunStats?.data) && !reRunStats?.isLoading,
    [reRunStats?.data, reRunStats?.isLoading]
  );

  const handleClickPlaceholderCTA = () => {
    if (buildMeta.reRun) {
      // dispatch(
      //   setShowReRunModal({ status: true, data: { source: 'test_insights' } })
      // );
    } else {
      navigate(ROUTES.settings_re_run);
    }
  };

  if (reRunStats?.hasNetworkError) {
    return (
      <div className="ti-rerun-summary">
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
      <div className="ti-rerun-summary">
        <O11yEmptyState
          title="No re-runs!"
          description={
            <>
              There were no re-runs in this build{' '}
              {/* <O11yHyperlink
                target="_blank"
                href={DOC_LINKS.reRun}
                // icon={<OpenInNewIcon />}
                iconPlacement="right"
                label="Learn more"
                linkWeight="regular"
                modifier="primary"
                // className="to-anchor"
              >
                Learn more
              </O11yHyperlink> */}
            </>
          }
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: buildMeta?.reRun ? 'Re-run' : 'Configure',
            onClick: handleClickPlaceholderCTA,
            size: 'default'
          }}
        />
        {buildMeta?.reRun && (
          <>
            {/* {portalize(
              true,
              <ReRunTriggerModal showReRunTest={false} />,
              REACT_ROOT_ELEMENT_ID
            )} */}
          </>
        )}
      </div>
    );
  }

  return (
    <div className="ti-rerun-summary">
      <div className="ti-rerun-summary__total">
        <BigNumber
          data={{
            count: reRunStats.data?.count || 0,
            meta: 'Tests passed after re-runs'
          }}
          config={{ noHover: true }}
        />
      </div>
      {/* <div className="ti-rerun-summary-table__wrapper">
        <table className="ti-rerun-summary-table">
          <thead className="ti-rerun-summary-table__head">
            <tr className="ti-rerun-summary-table__row">
              <td className="ti-rerun-summary-table__runs">Runs</td>
              <td>Passed</td>
              <td>Failed</td>
              <td>Skipped</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody className="ti-rerun-summary-table__body">
            {!reRunStats.data?.retryData?.length && (
              <tr>
                <td className="ti-rerun-summary-table__noData">
                  No Data Found
                </td>
              </tr>
            )}
            {reRunStats.data?.retryData?.map((item) => (
              <tr
                className="ti-rerun-summary-table__row"
                key={item.label}
                role="presentation"
                onClick={() => handleClickSummaryRow(item.id)}
              >
                <td className="ti-rerun-summary-table__data ti-rerun-summary-table__runs ti-rerun-summary-table__runs--label">
                  {item.label}
                </td>
                <td className="ti-rerun-summary-table__data">
                  {abbrNumber(item.passed || 0)}
                </td>
                <td className="ti-rerun-summary-table__data">
                  {abbrNumber(item.failed || 0)}
                </td>
                <td className="ti-rerun-summary-table__data">
                  {abbrNumber(item.skipped || 0)}
                </td>
                <td className="ti-rerun-summary-table__data">
                  {abbrNumber(item.total || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {reRunStats.data?.retryData?.length > 0 && (
        <VirtualisedTable
          data={reRunStats.data?.retryData}
          // endReached={loadBuildsData}
          // showFixedFooter={buildsApiStatus === API_STATUSES.PENDING}
          itemContent={(index, item) => (
            <>
              <O11yTableCell>{item.label}</O11yTableCell>
              <O11yTableCell>{abbrNumber(item.passed || 0)}</O11yTableCell>
              <O11yTableCell>{abbrNumber(item.failed || 0)}</O11yTableCell>
              <O11yTableCell>{abbrNumber(item.skipped || 0)}</O11yTableCell>
              <O11yTableCell>{abbrNumber(item.total || 0)}</O11yTableCell>
            </>
          )}
          fixedHeaderContent={() => (
            <O11yTableRow>
              <O11yTableCell wrapperClassName="py-3">Runs</O11yTableCell>
              <O11yTableCell wrapperClassName="py-3">Passed</O11yTableCell>
              <O11yTableCell wrapperClassName="py-3">Failed</O11yTableCell>
              <O11yTableCell wrapperClassName="py-3">Skipped</O11yTableCell>
              <O11yTableCell wrapperClassName="py-3">Total</O11yTableCell>
            </O11yTableRow>
          )}
          handleRowClick={handleClickSummaryRow}
        />
      )}
    </div>
  );
}
