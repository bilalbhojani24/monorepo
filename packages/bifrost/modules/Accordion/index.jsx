import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

const Accordion = ({ children, defaultOpen, wrapperAriaLabel }) => (
  <Disclosure as={Fragment} defaultOpen={defaultOpen}>
    <div aria-label={wrapperAriaLabel}>{children}</div>
  </Disclosure>
);

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
