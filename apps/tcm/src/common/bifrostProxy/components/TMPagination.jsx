/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { logEventHelper } from 'utils/logEvent';

const TMPagination = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { projectId, folderId } = useParams();

  const handlerPaginatedLoad = (toBeLoadedPage) => {
    if (props?.amplitudeEvent) {
      dispatch(
        logEventHelper(props?.amplitudeEvent, {
          project_id: projectId,
          folder_id: folderId
        })
      );
    }

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
  amplitudeEvent: PropTypes.string,
  attachments: PropTypes.arrayOf(PropTypes.object),
  onActionClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

TMPagination.defaultProps = {
  amplitudeEvent: '',
  attachments: [],
  wrapperClassName: '',
  onActionClick: null
};

export default TMPagination;
