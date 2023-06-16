import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

const ListTree = ({ children, indentationLevel, isTreeOpen }) => (
  <Disclosure
    as="div"
    defaultOpen={isTreeOpen}
    className={twClassNames('', {
      'ml-2 pl-1': indentationLevel > 1
    })}
  >
    {children}
  </Disclosure>
);

ListTree.propTypes = {
  children: PropTypes.node,
  isTreeOpen: PropTypes.bool,
  indentationLevel: PropTypes.number
};

ListTree.defaultProps = {
  children: null,
  isTreeOpen: false,
  indentationLevel: 1
};

export default ListTree;
