import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const AccordionPanel = ({ children }) => (
  <Transition
    enter="transition duration-300 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-200 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
    className="pb-4 pl-6"
  >
    <Disclosure.Panel>{children}</Disclosure.Panel>{' '}
  </Transition>
);

AccordionPanel.propTypes = {
  children: PropTypes.node.isRequired
};

export default AccordionPanel;
