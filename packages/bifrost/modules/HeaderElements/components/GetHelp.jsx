import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import AccessibleTooltip from '../../Header/components/AccessibleTooltip';
import Hyperlink from '../../Hyperlink';
import { ChevronDownIcon, MdArrowRightAlt } from '../../Icon';

const GetHelp = ({
  elementOptions,
  documentation,
  references,
  documentationLink,
  supportLink
}) => {
  const LINKS_TEXT_CLASSNAMES =
    'not-italic font-normal text-sm leading-4 text-black';

  const linkContainer = (title, optionArray) => (
    <>
      <div
        className={twClassNames(
          'flex flex-col items-start p-0 gap-2 w-full border-b border-[#dddddd]'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-row items-center py-0 px-2 gap-2 mb-2'
          )}
        >
          {/* <NotebookIcon /> */}
          <p
            className={twClassNames(
              'not-italic font-semibold text-xs leading-4 text-[#333333]'
            )}
          >
            {title}
          </p>
        </div>
      </div>
      <div
        className={twClassNames('flex flex-col items-start p-0 gap-0.5 w-full')}
      >
        {optionArray.map((element) => (
          <Hyperlink
            isCSR={false}
            wrapperClassName={twClassNames(
              'flex flex-row items-start p-2 gap-2 w-full hover:bg-[#edf8ff]'
            )}
            href={element.link}
            key={element.name}
          >
            <p className={twClassNames(LINKS_TEXT_CLASSNAMES)}>
              {element.name}
            </p>
          </Hyperlink>
        ))}
      </div>
    </>
  );

  const helpPopover = (
    columnleft,
    columnRight1,
    columnRight2,
    footerLeftLink,
    footerRightLink
  ) => (
    <div
      className={twClassNames('flex flex-col items-start py-4 px-0 gap-2.5')}
    >
      <div
        className={twClassNames(
          'flex flex-row items-start py-0 px-5 gap-5 pb-2.5 border-b border-[#dddddd]'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-1.5 w-[188px]'
          )}
        >
          {linkContainer(columnleft.title, columnleft.options)}
        </div>
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-5 w-[188px]'
          )}
        >
          <div
            className={twClassNames(
              'flex flex-col items-start p-0 gap-1.5 w-full'
            )}
          >
            {linkContainer(columnRight1.title, columnRight1.options)}
          </div>
          {columnRight2 && (
            <div
              className={twClassNames(
                'flex flex-col items-start p-0 gap-1.5 w-full'
              )}
            >
              {linkContainer(columnRight2.title, columnRight2.options)}
            </div>
          )}
        </div>
      </div>
      <div
        className={twClassNames(
          'flex flex-row items-start pt-1.5 px-5 pb-0 gap-5'
        )}
      >
        <Hyperlink
          isCSR={false}
          wrapperClassName={twClassNames(
            'flex flex-row items-center py-0 px-2 gap-1 text-base-800 w-[188px]'
          )}
          href={footerLeftLink}
        >
          <p
            className={twClassNames(
              'not-italic font-semibold text-sm leading-4 underline'
            )}
          >
            View Documentation
          </p>
          <MdArrowRightAlt className="h-3 w-3" />
        </Hyperlink>
        <Hyperlink
          isCSR={false}
          wrapperClassName={twClassNames(
            'flex flex-row items-center py-0 px-2 gap-1 text-base-800 w-[188px]'
          )}
          href={footerRightLink}
        >
          <p
            className={twClassNames(
              'not-italic font-semibold text-sm leading-4 underline'
            )}
          >
            View Support
          </p>
          <MdArrowRightAlt className="h-3 w-3" />
        </Hyperlink>
      </div>
    </div>
  );

  return (
    <AccessibleTooltip
      content={helpPopover(
        documentation,
        references,
        documentationLink,
        supportLink
      )}
    >
      <div
        className={twClassNames(
          'group flex flex-row items-center py-2 px-3 hover:text-base-100 [@media(max-width:1229px)]:hidden max-[1229px]:hidden'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-row justify-center items-center p-0 gap-1.5'
          )}
        >
          {elementOptions.icon}
          <p
            className={twClassNames(
              'not-italic font-medium text-sm leading-5 text-base-300 group-hover:text-base-100 float-left whitespace-nowrap'
            )}
          >
            {elementOptions.description}
          </p>
          <ChevronDownIcon
            className={twClassNames(
              'text-base-400 h-5 w-5 group-hover:text-base-100'
            )}
            aria-hidden="true"
          />
        </div>
      </div>
      <div
        className={twClassNames(
          'group flex-row items-center p-2 hover:text-base-100 hidden lg:flex [@media(min-width:1230px)]:hidden min-[1230px]:hidden'
        )}
      >
        {elementOptions.icon}
      </div>
    </AccessibleTooltip>
  );
};

GetHelp.propTypes = {
  documentation: PropTypes.objectOf(PropTypes.any).isRequired,
  references: PropTypes.objectOf(PropTypes.any).isRequired,
  documentationLink: PropTypes.string.isRequired,
  supportLink: PropTypes.string.isRequired,
  elementOptions: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default GetHelp;
