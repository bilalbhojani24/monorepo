/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeadings } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMPageHeadings = (props) => {
  const navigate = useNavigate();

  const onBreadcrumbClickHandler = (e, data) => {
    e?.preventDefault();
    e?.stopPropagation();

    props?.onBreadcrumbClick(e, data);
    if (data?.url) {
      navigate(data.url);
    }
  };

  return (
    <PageHeadings
      wrapperClassName="px-4 py-6 border-b border-base-300 bg-transparent"
      {...props}
      onBreadcrumbClick={onBreadcrumbClickHandler}
    />
  );
};

TMPageHeadings.propTypes = {
  onBreadcrumbClick: PropTypes.func
};

TMPageHeadings.defaultProps = {
  onBreadcrumbClick: () => {}
};

export default TMPageHeadings;
