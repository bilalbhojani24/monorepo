import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const AccordionPanel = ({ children, wrapperClassName }) => (
  <Transition
    enter="transition duration-300 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-200 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
    className={wrapperClassName}
    show={false}
  >
    <Disclosure.Panel>{children}</Disclosure.Panel>{' '}
  </Transition>
);

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string
};

AccordionPanel.defaultProps = {
  wrapperClassName: ''
};

export default AccordionPanel;
