import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

const AccordionSimpleHeader = ({ title, wrapperClassName }) => (
  <Disclosure.Button
    className={twClassNames(
      'flex w-full items-center gap-1 px-6 py-3',
      wrapperClassName
    )}
  >
    {({ open }) => (
      <>
        <ChevronRightIcon
          className={twClassNames(
            'truncate h-7 w-7 transition-transform font-medium',
            {
              'rotate-90 bg-brand-300': open
            }
          )}
        />
        <span>{title}</span>
      </>
    )}
  </Disclosure.Button>
);

AccordionSimpleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string
};

AccordionSimpleHeader.defaultProps = {
  wrapperClassName: ''
};

export default AccordionSimpleHeader;
