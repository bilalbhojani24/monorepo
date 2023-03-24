import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

const AccordionSimpleHeader = ({ title }) => (
  <Disclosure.Button className="flex w-full items-center gap-1">
    {({ open }) => (
      <>
        <ChevronRightIcon
          className={twClassNames('truncate h-7 w-7 transition-transform', {
            'rotate-90': open
          })}
        />
        <span>{title}</span>
      </>
    )}
  </Disclosure.Button>
);

AccordionSimpleHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default AccordionSimpleHeader;
