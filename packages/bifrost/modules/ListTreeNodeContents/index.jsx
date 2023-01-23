import React, { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

const ListTreeNodeContents = ({ children, isTreeOpen }) => (
  <Transition
    show={isTreeOpen}
    enter="transition duration-300 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-200 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
  >
    <Disclosure.Panel as={Fragment} static={isTreeOpen}>
      {children}
    </Disclosure.Panel>
  </Transition>
);

ListTreeNodeContents.propTypes = {
  children: PropTypes.node,
  isTreeOpen: PropTypes.oneOfType([PropTypes.bool, undefined])
};

ListTreeNodeContents.defaultProps = {
  children: null,
  isTreeOpen: undefined
};

export default ListTreeNodeContents;
