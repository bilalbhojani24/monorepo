import React from 'react';
import PropTypes from 'prop-types';

const StackedList = ({ footer, children }) => (
  <section>
    {children}
    <div className="sticky bottom-0 z-10">{footer}</div>
  </section>
);

StackedList.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.node.isRequired
};
StackedList.defaultProps = {
  footer: null
};

export default StackedList;
