import React, { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

const Accordion = ({ children, defaultOpen, wrapperClassName }) => (
  <Disclosure as={Fragment} defaultOpen={defaultOpen}>
    <div className={wrapperClassName}>{children}</div>
  </Disclosure>
);

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

Accordion.defaultProps = {
  defaultOpen: false,
  wrapperClassName: ''
};

export default Accordion;
