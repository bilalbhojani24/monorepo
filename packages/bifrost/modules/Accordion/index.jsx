import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

function Accordion({ children, defaultOpen }) {
  return (
    <Disclosure as={Fragment} defaultOpen={defaultOpen}>
      <div className="p-2">{children}</div>
    </Disclosure>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool
};

Accordion.defaultProps = {
  defaultOpen: false
};

export default Accordion;
