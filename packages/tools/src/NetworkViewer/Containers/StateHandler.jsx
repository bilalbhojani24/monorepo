import React from 'react';
import {
  EmptyState,
  Loader,
  MdError,
  MdNetworkCheck,
  MdOutlineRefresh
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { useNetwork } from '../state/Context';

function StateHandler({ children, logsURL, fetchOptions }) {
  const { state, actions } = useNetwork();
  const isLoading = state.get('loading');
  const hasError = state.get('error');
  const data = state.get('data');

  const fetchLogsAgain = () => {
    actions.fetchFile(logsURL, fetchOptions);
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center py-20 px-10">
        <Loader wrapperClassName="text-base-200 fill-base-400 w-8 h-8" />
      </div>
    );
  }
  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <EmptyState
          title="Something went wrong!"
          description="Something went wrong while fetching data"
          mainIcon={
            <MdError className="text-base-500 inline-block !h-11 !w-11" />
          }
          buttonProps={{
            children: (
              <div className="flex ">
                <MdOutlineRefresh
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Reload
              </div>
            ),
            onClick: fetchLogsAgain,
            size: 'default'
          }}
        />
      </div>
    );
  }

  if (!data.size) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <EmptyState
          title="Network logs not found"
          mainIcon={
            <MdNetworkCheck className="text-base-500 inline-block !h-11 !w-11" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  return <>{children}</>;
}
StateHandler.propTypes = {
  children: PropTypes.array.isRequired,
  logsURL: PropTypes.string.isRequired,
  fetchOptions: PropTypes.object.isRequired
};
export default StateHandler;
