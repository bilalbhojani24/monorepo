import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@browserstack/bifrost';

import { getConfigurationsThunk } from '../../../api';
import { logsSelector } from '../../../globalSlice';

import LogDetails from './LogDetails';
import LogsHeader from './LogsHeader';
import LogsTable from './LogsTable';

const Logs = () => {
  const logsData = useSelector(logsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfigurationsThunk());
  }, [dispatch]);
  return (
    <div className="h-full">
      <LogsHeader />
      <div className="mx-8 rounded-md bg-white p-6 drop-shadow">
        <p className="mb-3 text-lg font-semibold text-black">Logs Details</p>
        <LogsTable logsData={logsData} />
      </div>

      <div className="px-8 py-6 text-xs">
        <Pagination
          // onNextClick={onNextClick}
          // onPreviousClick={onPreviousClick}
          pageNumber={logsData.page_number}
          pageSize={logsData.page_size}
          count={logsData.total_logs}
        />
        <p className="text-base-500">Your data is retained for 6 months</p>
      </div>
      <LogDetails />
    </div>
  );
};
export default Logs;
