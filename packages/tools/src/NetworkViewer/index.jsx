import React, { useRef } from 'react';
import { useResizeObserver } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import MainContainer from './Containers/MainContainer';
import NetworkProvider from './state/NetworkProvider';

// import './styles/HARViewer.scss';

const NetworkViewer = ({
  data,
  scrollTimeStamp,
  onRequestSelect,
  onProcessingDone,
  scrollRequestPosition,
  containerClassName,
  showFooter,
  isResponseCaptured,
  logsURL,
  isResponseNotCapturedDueToCaps,
  showWaterfall,
  memoizationKey,
  appAutomateFramework
}) => {
  const parentContainerRef = useRef(null);
  const parentContainerSize = useResizeObserver(parentContainerRef);
  return (
    <section
      className={twClassNames('network-viewer', containerClassName)}
      ref={parentContainerRef}
    >
      <NetworkProvider
        data={data}
        scrollRequestPosition={scrollRequestPosition}
        scrollTimeStamp={scrollTimeStamp}
        containerWidth={
          parentContainerSize.inlineSize || parentContainerSize.width
        }
        showSummary={showFooter}
        memoizationKey={memoizationKey}
        onProcessingDone={onProcessingDone}
      >
        <MainContainer
          onRequestSelect={onRequestSelect}
          isResponseCaptured={isResponseCaptured}
          isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
          logsURL={logsURL}
          showWaterfall={showWaterfall}
          appAutomateFramework={appAutomateFramework}
        />
      </NetworkProvider>
    </section>
  );
};

NetworkViewer.propTypes = {
  containerClassName: PropTypes.string,
  data: PropTypes.object,
  onRequestSelect: PropTypes.func,
  onProcessingDone: PropTypes.func,
  scrollRequestPosition: PropTypes.oneOf(['before', 'after', 'near']),
  scrollTimeStamp: PropTypes.number,
  showFooter: PropTypes.bool,
  isResponseCaptured: PropTypes.bool,
  isResponseNotCapturedDueToCaps: PropTypes.bool,
  logsURL: PropTypes.string,
  showWaterfall: PropTypes.bool,
  memoizationKey: PropTypes.string,
  appAutomateFramework: PropTypes.string
};

NetworkViewer.defaultProps = {
  containerClassName: null,
  data: null,
  onRequestSelect: () => {},
  onProcessingDone: () => {},
  isResponseCaptured: true,
  scrollRequestPosition: 'near',
  scrollTimeStamp: null,
  showFooter: true,
  logsURL: '',
  isResponseNotCapturedDueToCaps: false,
  showWaterfall: true,
  memoizationKey: '',
  appAutomateFramework: ''
};

export default React.memo(NetworkViewer);
