import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScopeLine from 'common/ScopeLine/containers/ScopeLine';
import {
  setIsDetailsVisible,
  setShowDetailsFor
} from 'features/TestDetails/slices/uiSlice';
import RootNodeMetaData from 'features/TestList/components/RootNodeMetaData';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

export default function TestDataItem({ data }) {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickTest = (id) => {
    logInsightsInteractionEvent({
      interaction: 'unique_errors_test_details_opened'
    });
    dispatch(setShowDetailsFor(id));
    dispatch(setIsDetailsVisible(true));
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set('details', id);
    navigate({ search: searchParams.toString() });
  };
  return (
    <>
      {data.map((item) => (
        <div
          className="border-base-200 flex items-center justify-between border-b py-2 px-4 text-sm"
          onRowClick={() => handleClickTest(item?.details?.id)}
          key={item?.details?.id}
        >
          <div>
            <>
              <p className="text-base-900 text-sm font-medium">{item.title}</p>
              {!!item?.scopeList?.length && (
                // eslint-disable-next-line tailwindcss/no-arbitrary-value
                <div className="text-base-600 w-[330px] truncate text-left text-xs font-normal">
                  <ScopeLine scopes={item.scopeList} />
                </div>
              )}
              <RootNodeMetaData {...item?.details} />
            </>
          </div>
          <div>
            <p className="text-base-500">
              {milliSecondsToTime(item?.duration)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

TestDataItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};
