import React, { useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useNetwork } from '../state/Context';

import FilterContainer from './FilterContainer';
import NetworkTableContainer from './NetworkTableContainer';
import ReqDetailContainer from './ReqDetailContainer';
import StateHandler from './StateHandler';

const MainContainer = ({
  isResponseCaptured,
  logsURL,
  fetchOptions,
  isResponseNotCapturedDueToCaps,
  showWaterfall,
  responseHelpLink,
  filtersWrapperClassName,
  tableHeaderClassName,
  reqDetailsWrapperClassName,
  noLogsHelpLink
}) => {
  const { state } = useNetwork();
  const showReqDetail = state.get('showReqDetail');
  const isProcessing = state.get('isProcessing');
  const isLoading = state.get('loading');
  const hasError = state.get('error');
  const data = state.get('data');
  const filter = state.get('filter');
  const errorFilter = state.get('errorFilter');

  const isDisabled = useMemo(() => {
    if (!filter.name && !filter.value && !data.size && !errorFilter) {
      return true;
    }
    return isProcessing || isLoading || hasError;
  }, [
    data.size,
    errorFilter,
    filter.name,
    filter.value,
    hasError,
    isLoading,
    isProcessing
  ]);

  return (
    <>
      <section
        className={twClassNames(
          'sticky top-0 bg-white z-10 py-4 flex items-center justify-between',
          filtersWrapperClassName,
          {
            'pointer-events-none opacity-50': isDisabled
          }
        )}
      >
        <FilterContainer
          logsURL={logsURL}
          filtersWrapperClassName={filtersWrapperClassName}
        />
      </section>
      <StateHandler
        logsURL={logsURL}
        fetchOptions={fetchOptions}
        noLogsHelpLink={noLogsHelpLink}
      >
        <section className="relative flex flex-1">
          <NetworkTableContainer
            showWaterfall={showWaterfall}
            tableHeaderClassName={tableHeaderClassName}
          />
          {showReqDetail && (
            <ReqDetailContainer
              isResponseCaptured={isResponseCaptured}
              isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
              responseHelpLink={responseHelpLink}
              reqDetailsWrapperClassName={reqDetailsWrapperClassName}
            />
          )}
        </section>
      </StateHandler>
    </>
  );
};

MainContainer.propTypes = {
  isResponseCaptured: PropTypes.bool.isRequired,
  logsURL: PropTypes.string.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  responseHelpLink: PropTypes.string.isRequired,
  fetchOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  showWaterfall: PropTypes.bool,
  filtersWrapperClassName: PropTypes.string.isRequired,
  tableHeaderClassName: PropTypes.string.isRequired,
  reqDetailsWrapperClassName: PropTypes.string.isRequired,
  noLogsHelpLink: PropTypes.string.isRequired
};

MainContainer.defaultProps = {
  showWaterfall: true
};

export default MainContainer;