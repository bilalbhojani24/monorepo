import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

function Accordion({ children, defaultOpen, wrapperAriaLabel }) {
  return (
    <Disclosure as={Fragment} defaultOpen={defaultOpen}>
      <div aria-label={wrapperAriaLabel} className="p-2">
        {children}
      </div>
    </Disclosure>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  wrapperAriaLabel: PropTypes.string
};

Accordion.defaultProps = {
  defaultOpen: false,
  wrapperAriaLabel: null
};

export default Accordion;
