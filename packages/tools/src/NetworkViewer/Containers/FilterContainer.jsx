import React from 'react';
import PropTypes from 'prop-types';

import ErrorFilter from '../Components/Filters/ErrorFilter';
import RequestTypeFilters from '../Components/Filters/RequestTypeFilters';
import Search from '../Components/Filters/Search';
import { useNetwork } from '../state/Context';

const FilterContainer = ({ logsURL }) => {
  const { state, actions } = useNetwork();
  const filterByError = state.get('errorFilter');

  return (
    <section className="har-filter-container">
      <div className="har-filter-container__left">
        <div className="har-filter-container__search">
          <Search />
        </div>
        <RequestTypeFilters />
        <ErrorFilter
          isError={filterByError}
          onChange={actions.updateErrorFilter}
        />
      </div>

      {!!logsURL && (
        <a
          href={logsURL}
          rel="noopener noreferrer"
          target="_blank"
          className="har-filter-container__view-raw"
        >
          View Raw Logs
        </a>
      )}
    </section>
  );
};

export default FilterContainer;

FilterContainer.propTypes = {
  logsURL: PropTypes.string.isRequired
};
