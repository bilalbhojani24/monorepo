import React from 'react';
import { MdBarChart, MdError, MdErrorOutline } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import classnames from 'classnames';
import { O11yEmptyState, O11yTableCell } from 'common/bifrostProxy';
import Chart from 'common/Chart/containers/Chart';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import BigNumber from 'features/TestsInsights/components/BigNumber';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

function WidgetLayoutCard({
  bigNumberConfig,
  bigNumberData,
  chartOptions,
  emptyPlaceholderConfig,
  hasNetworkError,
  isLoading,
  onClickBigNumber,
  placeholderConfig,
  showNoData,
  tableConfig,
  tableData
}) {
  const isSmallCard = placeholderConfig?.size === 'small';

  if (isLoading) {
    return (
      <div className="top-0 z-10 flex h-full w-full items-center justify-center bg-white opacity-70">
        <O11yLoader
          text="Fetching data"
          wrapperClassName={`${
            emptyPlaceholderConfig.size === 'small' ? 'py-3' : 'py-6'
          }`}
          loaderClass={`text-base-200 fill-base-400 ${
            emptyPlaceholderConfig.size === 'small' ? 'w-4 h-4' : 'w-8 h-8'
          }`}
        />
      </div>
    );
  }

  if (hasNetworkError) {
    if (isSmallCard) {
      return (
        <div className="mt-2 flex h-full flex-1 items-center">
          <MdError className="text-danger-500 inline-block !h-6 !w-6" />
          <p className="text-base-600 ml-1 items-center text-sm font-medium">
            Something went wrong
          </p>
        </div>
      );
    }
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          buttonProps={{
            children: 'Reload',
            onClick: placeholderConfig?.onClickCTA,
            size: 'default'
          }}
          mainIcon={
            <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
          }
          {...placeholderConfig}
        />
      </div>
    );
  }

  if (showNoData) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <O11yEmptyState
          title="No data found"
          description={null}
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  const showBigNumber = () => {
    if (bigNumberData.count === 0) {
      return <p className="mt-2 font-bold">__</p>;
    }
    return (
      <>
        {!isEmpty(bigNumberData) && (
          <div className="mt-2">
            <BigNumber
              data={bigNumberData}
              onClick={onClickBigNumber}
              config={bigNumberConfig}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={twClassNames('flex flex-col justify-between h-full', {
        'mt-4': !isSmallCard
      })}
    >
      {showBigNumber()}
      {chartOptions && !!chartOptions?.series?.length && (
        <div
          className={classnames('h-full', {
            'h-full': tableData.length,
            'h-4/6': !isEmpty(bigNumberData)
          })}
        >
          <Chart options={chartOptions} />
        </div>
      )}
      {!!tableData.length && (
        <div
          className={classnames('relative h-full overflow-auto', {
            // 'ti-layout-card__table--withChart': chartOptions?.series?.length
          })}
        >
          <VirtualisedTable
            data={tableData}
            tableContainerWrapperClassName="border-none rounded-none md:rounded-none shadow-none"
            tableWrapperClassName="divide-y-0 border-none bg-black/0"
            tableBodyWrapperClassName="divide-y-0"
            itemContent={(index, singleBuildData) => (
              <>
                <O11yTableCell wrapperClassName="first:pl-0 sm:first:pl-0 border-none border-b-none">
                  <div className="flex items-center">
                    <div
                      className="mr-2 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: singleBuildData.color || '' }}
                    />
                    {singleBuildData.label || singleBuildData.name}
                  </div>
                </O11yTableCell>
                <O11yTableCell wrapperClassName="first:pl-0 sm:first:pl-0 text-end">
                  {singleBuildData.value}
                </O11yTableCell>
              </>
            )}
            fixedHeaderContent={null}
            handleRowClick={() => tableConfig?.onClickFlaky() || null}
          />
        </div>
      )}
    </div>
  );
}
WidgetLayoutCard.propTypes = {
  chartOptions: PropTypes.objectOf(PropTypes.any),
  tableData: PropTypes.arrayOf(PropTypes.any),
  bigNumberData: PropTypes.objectOf(PropTypes.any),
  bigNumberConfig: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  hasNetworkError: PropTypes.bool,
  showNoData: PropTypes.bool,
  onClickBigNumber: PropTypes.func,
  tableConfig: PropTypes.objectOf(PropTypes.any),
  placeholderConfig: PropTypes.objectOf(PropTypes.any),
  emptyPlaceholderConfig: PropTypes.objectOf(PropTypes.any)
};
WidgetLayoutCard.defaultProps = {
  chartOptions: {},
  tableData: [],
  bigNumberData: {},
  isLoading: false,
  hasNetworkError: false,
  showNoData: false,
  onClickBigNumber: () => {},
  tableConfig: {},
  bigNumberConfig: {},
  placeholderConfig: {},
  emptyPlaceholderConfig: {}
};

export default React.memo(WidgetLayoutCard);
