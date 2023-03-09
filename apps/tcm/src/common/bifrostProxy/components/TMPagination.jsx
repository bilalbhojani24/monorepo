/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMPagination = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerPaginatedLoad = (toBeLoadedPage) => {
    if (searchParams.get('p') === `${toBeLoadedPage}`) return;

    let navValue = {};
    if (toBeLoadedPage === 1) navValue = {};
    else navValue = { p: toBeLoadedPage };

    if (props.onActionClick) props.onActionClick(navValue);
    else setSearchParams(navValue);
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
  attachments: PropTypes.arrayOf(PropTypes.object),
  onActionClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

TMPagination.defaultProps = {
  attachments: [],
  wrapperClassName: '',
  onActionClick: null
};

export default TMPagination;
