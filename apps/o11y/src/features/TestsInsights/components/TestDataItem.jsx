import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
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
        <O11yTableRow onRowClick={() => handleClickTest(item?.details?.id)}>
          <O11yTableCell>
            <>
              {!!item?.scopeList?.length && (
                <div className="text-base-900 text-ellipsis whitespace-nowrap text-sm font-medium">
                  <ScopeLine scopes={item.scopeList} />
                </div>
              )}
              <p className="text-base-600 text-xs font-normal">{item.title}</p>
              <RootNodeMetaData {...item?.details} />
            </>
          </O11yTableCell>
          <O11yTableCell>
            <p className="text-base-500">
              {milliSecondsToTime(item?.duration)}
            </p>
          </O11yTableCell>
        </O11yTableRow>
      ))}
    </>
  );
}

TestDataItem.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};
