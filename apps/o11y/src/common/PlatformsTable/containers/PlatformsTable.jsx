import React from 'react';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

const PlatformsTable = ({
  isLoading,
  data,
  onRowClick,
  FixedHeaderContent,
  ItemContent
}) => {
  if (isLoading) {
    return (
      <O11yLoader
        wrapperClassName="py-6"
        loaderClass="text-base-200 fill-base-400 w-8 h-8"
      />
    );
  }

  if (isEmpty(data)) {
    return (
      <div className={twClassNames('flex items-center justify-center flex-1')}>
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <div className={twClassNames('flex-1')}>
      <VirtualisedTable
        style={{ height: '100%' }}
        data={data}
        fixedHeaderContent={FixedHeaderContent}
        itemContent={(index, buildData) => (
          <ItemContent buildData={buildData} />
        )}
        handleRowClick={onRowClick}
        showFixedFooter={false}
      />
    </div>
  );
};

PlatformsTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  onRowClick: PropTypes.func.isRequired,
  FixedHeaderContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired,
  ItemContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

export default PlatformsTable;
