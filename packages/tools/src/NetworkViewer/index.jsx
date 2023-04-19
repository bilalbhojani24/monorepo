import React, { useRef } from 'react';
import { useResizeObserver } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import MainContainer from './Containers/MainContainer';
import NetworkProvider from './state/NetworkProvider';

const NetworkViewer = ({
  data,
  logsURL,
  fetchOptions,
  onRequestSelect,
  onProcessingDone,
  containerClassName,
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  showWaterfall
}) => {
  const parentContainerRef = useRef(null);
  const parentContainerSize = useResizeObserver(parentContainerRef);

  return (
    <section
      className={twClassNames('p-4', containerClassName)}
      ref={parentContainerRef}
    >
      <NetworkProvider
        data={data}
        file={logsURL}
        fetchOptions={fetchOptions}
        containerWidth={
          parentContainerSize.inlineSize || parentContainerSize.width
        }
        onProcessingDone={onProcessingDone}
      >
        <MainContainer
          onRequestSelect={onRequestSelect}
          isResponseCaptured={isResponseCaptured}
          isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
          logsURL={logsURL}
          fetchOptions={fetchOptions}
          showWaterfall={showWaterfall}
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
  isResponseCaptured: PropTypes.bool,
  isResponseNotCapturedDueToCaps: PropTypes.bool,
  logsURL: PropTypes.string,
  showWaterfall: PropTypes.bool,
  fetchOptions: PropTypes.object
};

NetworkViewer.defaultProps = {
  containerClassName: null,
  data: null,
  onRequestSelect: () => {},
  onProcessingDone: () => {},
  isResponseCaptured: true,
  logsURL: '',
  isResponseNotCapturedDueToCaps: false,
  showWaterfall: true,
  fetchOptions: {}
};

export default React.memo(NetworkViewer);
