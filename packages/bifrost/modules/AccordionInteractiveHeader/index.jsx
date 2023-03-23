import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

function AccordionInteractiveHeader({
  trigger,
  title,
  asideContent,
  children
}) {
  return (
    <span className="flex items-start gap-1">
      {trigger && <span>{trigger}</span>}
      <div className="w-full">
        <div className="flex justify-between">
          <Disclosure.Button as={Fragment}>
            {({ open }) => (
              <button
                type="button"
                className={twClassNames(
                  'flex  cursor-pointer items-center gap-1',
                  { 'text-base-800': open },
                  { 'text-base-500': !open }
                )}
              >
                <ChevronRightIcon
                  className={twClassNames(
                    'truncate h-6 w-6 transition-transform',
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
        {children && <div className="ml-7">{children}</div>}
      </div>
    </span>
  );
}

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
