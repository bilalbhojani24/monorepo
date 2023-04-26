import React from 'react';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon,
  Hyperlink,
  MdOpenInNew
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import ErrorFilter from '../Components/Filters/ErrorFilter';
import RequestTypeFilters from '../Components/Filters/RequestTypeFilters';
import Search from '../Components/Filters/Search';
import { NL_EVENTS } from '../nlEvents';
import { useNetwork } from '../state/Context';

const FilterContainer = ({ logsURL }) => {
  const { state, actions } = useNetwork();
  const filterByError = state.get('errorFilter');

  const handleClickViewRawLogs = () => {
    window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
      event: NL_EVENTS.VIEW_RAW_LOGS_CLICKED
    });
  };

  return (
    <>
      <Search />
      <div className="flex items-center gap-2">
        <ErrorFilter
          isError={filterByError}
          onChange={actions.updateErrorFilter}
        />
        <RequestTypeFilters />
        {!!logsURL && (
          <Dropdown onClick={() => {}}>
            <DropdownTrigger wrapperClassName="p-2">
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </DropdownTrigger>

            <DropdownOptionGroup>
              <DropdownOptionItem
                option={{
                  body: (
                    <Hyperlink
                      href={logsURL}
                      rel="noopener noreferrer"
                      target="_blank"
                      wrapperClassName="text-sm text-base-700"
                      onClick={handleClickViewRawLogs}
                    >
                      <span className="flex items-center gap-2">
                        View Raw Logs
                        <MdOpenInNew className="text-base-700 text-lg" />
                      </span>
                    </Hyperlink>
                  ),
                  id: 'view logs'
                }}
              />
            </DropdownOptionGroup>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default FilterContainer;

FilterContainer.propTypes = {
  logsURL: PropTypes.string.isRequired
};
