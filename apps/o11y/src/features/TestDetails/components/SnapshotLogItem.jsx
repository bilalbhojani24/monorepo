import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Gallery from 'common/Gallery';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { getActiveLogLevelsByType } from '../slices/selectors';
import { getParsedJSON } from '../utils';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function SnapshotLogItem({ data }) {
  const [logData, setLogData] = useState({});
  const galleryRef = useRef(null);
  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data)) {
      const parsedContent = getParsedJSON(data?.content) || [];
      setLogData([parsedContent]);
    }
  }, [data]);

  const handleImgClick = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    galleryRef?.current?.fullScreen?.();
    // Make gallery visible after fullscreen
    setTimeout(() => {
      galleryRef?.current?.imageGallery?.current?.classList?.remove?.(
        'invisible'
      );
    }, 0);
  };
  if (
    isEmpty(data) ||
    isEmpty(logData) ||
    !activeLogLevels.includes(data?.logLevel)
  ) {
    return null;
  }
  return (
    <div
      className={`tdl-log-item d-flex align-items-start tdl-log-item--${data?.logType} tdl-log-item--${data?.logLevel}`}
      data-idx={data.idx}
    >
      <Gallery images={logData} ref={galleryRef} />
      {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
      <LogItemIcon logLevel={data?.logLevel} />
      <button
        onClick={handleImgClick}
        className="tdl-log-item__snapshot-handler"
        type="button"
      >
        <img
          src={logData?.[0]?.s3_url}
          alt="test screenshot"
          className="tdl-log-item__snapshot"
        />
      </button>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </div>
  );
}
SnapshotLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
