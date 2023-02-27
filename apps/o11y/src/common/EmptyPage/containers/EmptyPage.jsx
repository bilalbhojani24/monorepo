import React from 'react';
import NotFoundImg from 'assets/illustrations/no_data_found.svg';
import PropTypes from 'prop-types';

export default function EmptyPage({ text }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <img src={NotFoundImg} alt="Coming Soon" />
      <p className="text-xl">{text}</p>
    </div>
  );
}
EmptyPage.propTypes = {
  text: PropTypes.string
};
EmptyPage.defaultProps = {
  text: 'No data found'
};
