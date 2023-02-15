import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import { ChevronDownIcon, ChevronRightIcon } from '../Icon';

const Accordion = ({
  openByDefault,
  triggerContentNode,
  panelContentNode,
  triggerClassName,
  onTriggerClick,
  onChevronClick
}) => (
  <Disclosure as={Fragment} defaultOpen={openByDefault}>
    <Disclosure.Button as={Fragment}>
      {({ open }) => (
        <div
          className={twClassNames(
            'pt-3 flex select-none border-base-200',
            triggerClassName
          )}
          role="presentation"
          onClick={(event) => {
            onTriggerClick?.(event);
          }}
        >
          <div
            className="my-auto h-5 w-5"
            role="presentation"
            onClick={(event) => {
              onChevronClick?.(event);
            }}
          >
            {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </div>

          {triggerContentNode}
        </div>
      )}
    </Disclosure.Button>

    <Transition
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel>{panelContentNode}</Disclosure.Panel>
    </Transition>
  </Disclosure>
);

Accordion.propTypes = {
  openByDefault: PropTypes.bool,
  triggerContentNode: PropTypes.node,
  panelContentNode: PropTypes.node,
  triggerClassName: PropTypes.string,
  onTriggerClick: PropTypes.func,
  onChevronClick: PropTypes.func
};

Accordion.defaultProps = {
  openByDefault: false,
  triggerContentNode: <div>Trigger Node</div>,
  panelContentNode: <div>Panel Node</div>,
  triggerClassName: '',
  onTriggerClick: () => {},
  onChevronClick: () => {}
};

export default Accordion;
