import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

const AccordionInteractiveHeader = ({
  trigger,
  title,
  asideContent,
  children
}) => (
  <span className="flex place-items-start gap-1.5 py-3 px-6">
    {trigger && <span>{trigger}</span>}
    <div className="w-full">
      <div className="flex justify-between">
        <Disclosure.Button as={Fragment}>
          {({ open }) => (
            <button
              type="button"
              className={twClassNames(
                'flex cursor-pointer items-center gap-2.5 grow m-1 text-base-800 font-medium'
              )}
            >
              <ChevronRightIcon
                className={twClassNames(
                  'truncate h-5 w-5 transition-transform',
                  {
                    'rotate-90': open
                  }
                )}
              />
              <span>{title}</span>
            </button>
          )}
        </Disclosure.Button>
        {asideContent && <div className="truncate">{asideContent}</div>}
      </div>
      {children && <div className="ml-7 pl-0.5">{children}</div>}
    </div>
  </span>
);

AccordionInteractiveHeader.propTypes = {
  trigger: PropTypes.node,
  title: PropTypes.node,
  asideContent: PropTypes.node,
  children: PropTypes.node
};

AccordionInteractiveHeader.defaultProps = {
  trigger: null,
  title: null,
  asideContent: null,
  children: null
};

export default AccordionInteractiveHeader;
