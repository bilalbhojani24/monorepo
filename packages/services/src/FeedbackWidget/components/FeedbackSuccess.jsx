import React from 'react';
import PropTypes from 'prop-types';

const FeedbackSuccess = ({ description, icon, title }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-lg font-medium leading-6">{title}</p>
    <p className="text-base-500 text-sm font-normal leading-5">{description}</p>
  </div>
);

export default FeedbackSuccess;

FeedbackSuccess.propTypes = {
  description: PropTypes.node,
  icon: PropTypes.node,
  title: PropTypes.node
};
FeedbackSuccess.defaultProps = {
  description: null,
  icon: null,
  title: null
};
