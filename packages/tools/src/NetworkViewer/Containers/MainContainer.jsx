import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useNetwork } from '../state/Context';

import FilterContainer from './FilterContainer';
import NetworkTableContainer from './NetworkTableContainer';
import ReqDetailContainer from './ReqDetailContainer';

const MainContainer = ({
  onRequestSelect,
  isResponseCaptured,
  logsURL,
  isResponseNotCapturedDueToCaps,
  showWaterfall,
  appAutomateFramework
}) => {
  const { state } = useNetwork();
  const showReqDetail = state.get('showReqDetail');
  const isProcessing = state.get('isProcessing');

  return (
    <div
      className={twClassNames('har-main-container', {
        'har-main-container--disabled': isProcessing
      })}
    >
      <FilterContainer logsURL={logsURL} />
      <section className="har-main-container__table-wrapper">
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
    </div>
  );
};

MainContainer.propTypes = {
  onRequestSelect: PropTypes.func,
  isResponseCaptured: PropTypes.bool.isRequired,
  logsURL: PropTypes.string.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  showWaterfall: PropTypes.bool,
  appAutomateFramework: PropTypes.string
};

MainContainer.defaultProps = {
  onRequestSelect: () => {},
  showWaterfall: true,
  appAutomateFramework: ''
};

export default MainContainer;
