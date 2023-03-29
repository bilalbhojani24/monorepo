import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';

const StackedList = ({ footer, children, isCard }) => (
  <section>
    {React.Children.map(children, (child) => {
      if (isValidElement(child))
        return React.cloneElement(child, {
          isCard
        });
      return child;
    })}
    {footer && <div className="sticky bottom-0 z-10 mt-6">{footer}</div>}
  </section>
);

StackedList.propTypes = {
  footer: PropTypes.node,
  isCard: PropTypes.bool,
  children: PropTypes.node.isRequired
};

StackedList.defaultProps = {
  isCard: false,
  footer: null
};

export default StackedList;
