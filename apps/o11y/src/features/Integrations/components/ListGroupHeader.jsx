import React from 'react';
import PropTypes from 'prop-types';

function ListGroupHeader({ title }) {
  return <p className="py-2 text-xs uppercase">{title}</p>;
}

ListGroupHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ListGroupHeader;
