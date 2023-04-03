/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import { MdBarChart, MdErrorOutline } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import classnames from 'classnames';
import {
  O11yEmptyState,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import Chart from 'common/Chart/containers/Chart';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import BigNumber from 'features/TestsInsights/components/BigNumber';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
// import CardHeader from '../widgets/CardHeader';
// import InfoTable from '../widgets/InfoTable';

// import '../styles/WidgetLayoutCard.scss';

function WidgetLayoutCard({
  title,
  bigNumberConfig,
  bigNumberData,
  chartOptions,
  emptyPlaceholderConfig,
  hasNetworkError,
  height,
  isLoading,
  onClickBigNumber,
  placeholderConfig,
  showMoreButton,
  showNoData,
  tableConfig,
  tableData
}) {
  const LAYOUT_HEIGHT = `h-${height}`;
  if (isLoading) {
    return (
      <div className="top-0 z-10 flex h-full w-full items-center justify-center bg-white opacity-70">
        <O11yLoader
          text="Fetching data"
          wrapperClassName="py-6"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      </div>
    );
  }

  if (hasNetworkError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          buttonProps={{
            children: 'Reload',
            onClick: {},
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
      <div className="flex flex-1 items-center justify-center">
        {/* <CardHeader title={title} showMore={showMoreButton} />
        <PlaceHolder
          text="No data found"
          type="empty"
          {...emptyPlaceholderConfig}
        /> */}
        <O11yEmptyState
          title="No data found"
          description="Please update your access privileges by Contacting your administrator"
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  return (
    <div
      className={twClassNames('ti-layout-card flex flex-col', LAYOUT_HEIGHT)}
    >
      <div className="ti-layout-card__body h-full">
        {!isEmpty(bigNumberData) && (
          <div className="ti-layout-card__bigNumber">
            <BigNumber
              data={bigNumberData}
              onClick={onClickBigNumber}
              config={bigNumberConfig}
            />
          </div>
        )}
        {chartOptions && !!chartOptions?.series?.length && (
          <div
            className={classnames('ti-layout-card__chart h-full', {
              'ti-layout-card__chart--withTable': tableData.length,
              'ti-layout-card__chart--withBigNumber': !isEmpty(bigNumberData)
            })}
          >
            <Chart options={chartOptions} />
          </div>
        )}
        {!!tableData.length && (
          <div
            className={classnames('ti-layout-card__table h-full', {
              'ti-layout-card__table--withChart': chartOptions?.series?.length
            })}
          >
            <VirtualisedTable
              data={tableData}
              tableContainerWrapperClassName="border-none rounded-none md:rounded-none shadow-none"
              itemContent={(index, singleBuildData) => (
                <>
                  <O11yTableCell>
                    <div className="flex items-center">
                      <div
                        className="mr-2 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: singleBuildData.color || '' }}
                      />
                      {singleBuildData.label || singleBuildData.name}
                    </div>
                  </O11yTableCell>
                  <O11yTableCell>{singleBuildData.value}</O11yTableCell>
                </>
              )}
              fixedHeaderContent={null}
              handleRowClick={() => tableConfig?.onClickFlaky() || null}
            />
          </div>
        )}
      </div>
    </div>
  );
}
WidgetLayoutCard.propTypes = {
  title: PropTypes.string.isRequired,
  chartOptions: PropTypes.objectOf(PropTypes.any),
  tableData: PropTypes.arrayOf(PropTypes.any),
  bigNumberData: PropTypes.objectOf(PropTypes.any),
  bigNumberConfig: PropTypes.objectOf(PropTypes.any),
  isLoading: PropTypes.bool,
  hasNetworkError: PropTypes.bool,
  height: PropTypes.number,
  showNoData: PropTypes.bool,
  onClickBigNumber: PropTypes.func,
  tableConfig: PropTypes.objectOf(PropTypes.any),
  placeholderConfig: PropTypes.objectOf(PropTypes.any),
  emptyPlaceholderConfig: PropTypes.objectOf(PropTypes.any),
  showMoreButton: PropTypes.bool
};
WidgetLayoutCard.defaultProps = {
  chartOptions: {},
  tableData: [],
  bigNumberData: {},
  showMoreButton: false,
  isLoading: false,
  height: 0,
  hasNetworkError: false,
  showNoData: false,
  onClickBigNumber: () => {},
  tableConfig: {},
  bigNumberConfig: {},
  placeholderConfig: {},
  emptyPlaceholderConfig: {}
};

export default React.memo(WidgetLayoutCard);
