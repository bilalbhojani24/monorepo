import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

const AccordionSimpleHeader = ({
  title,
  wrapperClassName,
  controller,
  onClick
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Disclosure.Button
      onClick={handleClick}
      className={twClassNames(
        'flex w-full items-center gap-1 px-6 py-3',
        wrapperClassName
      )}
    >
      {typeof controller !== 'undefined'
        ? () => (
            <>
              <ChevronRightIcon
                className={twClassNames(
                  'truncate h-7 w-7 transition-transform font-medium',
                  {
                    'rotate-90': controller
                  }
                )}
              />
              <span>{title}</span>
            </>
          )
        : ({ open }) => (
            <>
              <ChevronRightIcon
                className={twClassNames(
                  'truncate h-7 w-7 transition-transform font-medium',
                  {
                    'rotate-90': open
                  }
                )}
              />
              <span>{title}</span>
            </>
          )}
    </Disclosure.Button>
  );
};

AccordionSimpleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  controller: PropTypes.bool,
  onClick: PropTypes.func
};

AccordionSimpleHeader.defaultProps = {
  wrapperClassName: '',
  controller: undefined,
  onClick: () => {}
};

export default AccordionSimpleHeader;
