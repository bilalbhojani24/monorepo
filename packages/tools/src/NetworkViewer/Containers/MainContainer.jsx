import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useNetwork } from '../state/Context';

import FilterContainer from './FilterContainer';
import NetworkTableContainer from './NetworkTableContainer';
import ReqDetailContainer from './ReqDetailContainer';
import StateHandler from './StateHandler';

const MainContainer = ({
  onRequestSelect,
  isResponseCaptured,
  logsURL,
  fetchOptions,
  isResponseNotCapturedDueToCaps,
  showWaterfall,
  appAutomateFramework
}) => {
  const { state } = useNetwork();
  const showReqDetail = state.get('showReqDetail');
  const isProcessing = state.get('isProcessing');
  const isLoading = state.get('loading');
  const hasError = state.get('error');

  return (
    <div>
      <div
        className={twClassNames({
          'pointer-events-none': isProcessing || isLoading || hasError
        })}
      >
        <FilterContainer logsURL={logsURL} />
      </div>
      <StateHandler logsURL={logsURL} fetchOptions={fetchOptions}>
        <section className="flex flex-wrap">
          <NetworkTableContainer
            onRequestSelect={onRequestSelect}
            showWaterfall={showWaterfall}
            appAutomateFramework={appAutomateFramework}
          />
          {showReqDetail && (
            <ReqDetailContainer
              isResponseCaptured={isResponseCaptured}
              isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
              appAutomateFramework={appAutomateFramework}
            />
          )}
        </section>
      </StateHandler>
    </div>
  );
};

MainContainer.propTypes = {
  onRequestSelect: PropTypes.func,
  isResponseCaptured: PropTypes.bool.isRequired,
  logsURL: PropTypes.string.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  fetchOptions: PropTypes.object.isRequired,
  showWaterfall: PropTypes.bool,
  appAutomateFramework: PropTypes.string
};

MainContainer.defaultProps = {
  onRequestSelect: () => {},
  showWaterfall: true,
  appAutomateFramework: ''
};

export default MainContainer;
