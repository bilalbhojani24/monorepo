import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import ScopeLine from 'common/ScopeLine/containers/ScopeLine';
import { showTestDetailsDrawer } from 'features/TestDetails/utils';
import RootNodeMetaData from 'features/TestList/components/RootNodeMetaData';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

export default function TestDataItem({ data }) {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const dispatch = useDispatch();

  const handleClickTest = (id) => {
    logInsightsInteractionEvent({
      interaction: 'unique_errors_test_details_opened'
    });
    dispatch(showTestDetailsDrawer(id));
  };
  return (
    <>
      {data.map((item) => (
        <div
          className="border-base-200 pointer-events-auto flex cursor-pointer items-center justify-between border-b py-2 px-4 text-sm"
          onClick={() => handleClickTest(item?.details?.id)}
          role="presentation"
          key={item?.details?.id}
        >
          <div>
            <>
              <p className="text-base-900 break-words text-sm font-medium">
                {item.title}
              </p>
              {!!item?.scopeList?.length && (
                // eslint-disable-next-line tailwindcss/no-arbitrary-value
                <div className="text-base-600 w-[330px] truncate text-left text-xs font-normal">
                  <ScopeLine scopes={item.scopeList} />
                </div>
              )}
              <RootNodeMetaData {...item?.details} />
            </>
          </div>
          <p className="text-base-500 self-start whitespace-nowrap pl-4">
            {milliSecondsToTime(item?.duration)}
          </p>
        </div>
      ))}
    </>
  );
}

TestDataItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};
