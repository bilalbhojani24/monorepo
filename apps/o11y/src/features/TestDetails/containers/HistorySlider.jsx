import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import StatusIcon from 'common/StatusIcon';
import PropTypes from 'prop-types';

import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import { setShowTestDetailsFor } from '../slices/uiSlice';

const HistoryItem = ({ data, isActive, onClick }) => (
  <button
    className={twClassNames('flex items-center gap-2 p-1 pb-4 ', {
      'border-b-2 border-brand-500': isActive
    })}
    onClick={() => {
      onClick(data);
    }}
    type="button"
  >
    <StatusIcon
      status={data?.status}
      {...(isActive ? {} : { noColor: true })}
    />
    <p
      className={twClassNames('text-base-500 text-sm font-medium leading-5', {
        'text-brand-500': isActive
      })}
    >
      {data.serialId}
    </p>
  </button>
);

HistoryItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const HistorySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testMeta = useSelector(getTestMeta);
  const testRunId = useSelector(getShowTestDetailsFor);

  const scrollerRef = useRef(null);

  const handleActiveSlide = useCallback(
    (data) => {
      dispatch(setShowTestDetailsFor(data.testRunId));
      const searchParams = new URLSearchParams(window?.location?.search);
      searchParams.set('details', data.testRunId);
      navigate({ search: searchParams.toString() });
    },
    [dispatch, navigate]
  );

  return (
    <div className="mb-4 px-6">
      <div
        className="border-base-300 flex flex-nowrap gap-8 overflow-x-auto border-b"
        ref={scrollerRef}
      >
        {testMeta.data.history?.map((testHistory) => (
          <HistoryItem
            key={testHistory.testRunId}
            data={testHistory}
            isActive={testRunId === testHistory.testRunId}
            onClick={handleActiveSlide}
          />
        ))}
      </div>
    </div>
  );
};

HistorySlider.propTypes = {};

export default HistorySlider;
