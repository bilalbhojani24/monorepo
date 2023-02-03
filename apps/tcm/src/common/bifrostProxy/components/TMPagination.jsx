/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMPagination = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerPaginatedLoad = (toBeLoadedPage) => {
    if (searchParams.get('p') === `${toBeLoadedPage}`) return;

    if (toBeLoadedPage === 1) setSearchParams({});
    else setSearchParams({ p: toBeLoadedPage });
  };

  return (
    <Pagination
      {...props}
      onNextClick={handlerPaginatedLoad}
      onPageNumberClick={handlerPaginatedLoad}
      onPreviousClick={handlerPaginatedLoad}
    />
  );
};

TMPagination.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActionClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};

TMPagination.defaultProps = {
  wrapperClassName: ''
};

export default TMPagination;
