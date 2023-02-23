import React, { useEffect } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import HeaderProducts from '../HeaderProducts';
import Hyperlink from '../Hyperlink';
import { MdArrowRightAlt } from '../Icon';
import NotebookIcon from '../Icon/HeaderIcons/NotebookIcon';
import ToolTip from '../Tooltip';

import {
  ACCOUNT_ARRAY,
  ELEMENTS_WITH_LABEL
} from './const/headerElementsConstants';

import './styles.scss';

const ACCOUNT_LINKS_CLASSNAMES =
  'flex flex-row items-start p-2 gap-2 w-full hover:bg-[#edf8ff]';
const LINKS_TEXT_CLASSNAMES =
  'not-italic font-normal text-sm leading-4 text-black';

const HeaderElements = ({
  documentation,
  references,
  others,
  documentationLink,
  supportLink,
  showTestInsights,
  beamerProductId,
  headerElementArray
}) => {
  useEffect(() => {
    window.beamer_config = {
      product_id: beamerProductId,
      selector: 'beamer-notification'
    };
    const script = document.createElement('script');

    script.src = 'https://app.getbeamer.com/js/beamer-embed.js';
    script.defer = 'defer';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [beamerProductId]);

  const linkContainer = (title, optionArray) => (
    <>
      <div className={twClassNames('flex flex-col items-start p-0 gap-2')}>
        <div
          className={twClassNames('flex flex-row items-center py-0 px-2 gap-2')}
        >
          <NotebookIcon />
          <p
            className={twClassNames(
              'not-italic font-semibold text-xs leading-4 text-[#333333]'
            )}
          >
            {title}
          </p>
        </div>
        <span
          className={twClassNames(
            'w-full h-0.5 border border-solid border-[#dddddd]'
          )}
        />
      </div>
      <div
        className={twClassNames('flex flex-col items-start p-0 gap-0.5 w-full')}
      >
        {optionArray.map((element) => (
          <Hyperlink
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
        className={twClassNames('flex flex-row items-start py-0 px-5 gap-5')}
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
            className={twClassNames('flex flex-col items-start p-0 gap-1.5')}
          >
            {linkContainer(columnRight1.title, columnRight1.options)}
          </div>
          {columnRight2 && (
            <div
              className={twClassNames('flex flex-col items-start p-0 gap-1.5')}
            >
              {linkContainer(columnRight2.title, columnRight2.options)}
            </div>
          )}
        </div>
      </div>
      <span
        className={twClassNames(
          'w-full h-0 border border-solid border-[#dddddd]'
        )}
      />
      <div
        className={twClassNames(
          'flex flex-row items-start pt-1.5 px-5 pb-0 gap-5'
        )}
      >
        <Hyperlink
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
  const accountPopover = (productSupportLink, testInsight) => (
    <div className={twClassNames('flex flex-col items-start p-0')}>
      <div
        className={twClassNames('flex flex-row items-start py-0 px-4 gap-5')}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-0.5 w-[208px]'
          )}
        >
          {ACCOUNT_ARRAY.map((element) => (
            <Hyperlink
              wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
              href={
                element.name === 'Support' ? productSupportLink : element.link
              }
              key={element.name}
            >
              <p className={twClassNames(LINKS_TEXT_CLASSNAMES)}>
                {element.name}
              </p>
            </Hyperlink>
          ))}
          {testInsight && (
            <Hyperlink
              wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
              href="https://www.browserstack.com/accounts/usage-reporting"
            >
              <p className={twClassNames(LINKS_TEXT_CLASSNAMES)}>
                Test Insights
              </p>
              <div
                className={twClassNames(
                  'flex justify-center items-center w-8 h-4 bg-[#ddf1ff] rounded-sm py-0 px-1 gap-2.5'
                )}
              >
                <p
                  className={twClassNames(
                    'not-italic font-semibold text-xs leading-4 flex items-center text-center text-[#0067dd]'
                  )}
                >
                  New
                </p>
              </div>
            </Hyperlink>
          )}
        </div>
      </div>
      <span
        className={twClassNames(
          'w-full h-0 border border-solid border-[#dddddd]'
        )}
      />
      <div
        className={twClassNames('flex flex-row items-start py-0 px-4 gap-5')}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-0.5 w-[208px]'
          )}
        >
          <Hyperlink
            wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
            href="https://www.browserstack.com/users/sign_out"
          >
            <p
              className={twClassNames(
                'not-italic font-semibold text-sm leading-4 text-danger-600'
              )}
            >
              Sign out
            </p>
          </Hyperlink>
        </div>
      </div>
    </div>
  );
  const hyperlinkElements = (elementOptions) => (
    <Hyperlink
      wrapperClassName={twClassNames(
        'group flex flex-row items-center py-2 px-3 hover:text-base-100 max-[1024px]:hidden'
      )}
      href={elementOptions.link}
      key={elementOptions.name}
    >
      <div
        className={twClassNames(
          'flex flex-row justify-center items-center p-0 gap-1.5 w-[126px]'
        )}
      >
        {elementOptions.icon}
        <p
          className={twClassNames(
            'not-italic font-medium text-sm leading-5 text-base-300 group-hover:text-base-100'
          )}
        >
          {elementOptions.description}
        </p>
      </div>
    </Hyperlink>
  );
  const helpElement = (elementOptions) => (
    <ToolTip
      arrowClassName="w-4 h-2"
      content={helpPopover(
        documentation,
        references,
        others,
        documentationLink,
        supportLink
      )}
      theme="light"
      placementSide="bottom"
      size="lg"
      key={elementOptions.name}
    >
      <div
        className={twClassNames(
          'group flex flex-row items-center py-2 px-3 hover:text-base-100 max-[1229px]:hidden'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-row justify-center items-center p-0 gap-1.5 w-[88px]'
          )}
        >
          {elementOptions.icon}
          <p
            className={twClassNames(
              'not-italic font-medium text-sm leading-5 text-base-300 group-hover:text-base-100'
            )}
          >
            {elementOptions.description}
          </p>
        </div>
      </div>
      <div
        className={twClassNames(
          'group flex flex-row items-center p-2 hover:text-base-100 min-[1230px]:hidden max-[1024px]:hidden'
        )}
        href={elementOptions.link}
      >
        {elementOptions.icon}
      </div>
    </ToolTip>
  );
  const elementRender = (element) => {
    let temp = null;
    if (['team', 'pricing'].includes(element.name)) {
      temp = hyperlinkElements(element);
    } else if (element.name === 'help') {
      temp = helpElement(element);
    } else if (element.name === 'account') {
      temp = (
        <ToolTip
          arrowClassName="w-4 h-2"
          content={accountPopover(supportLink, showTestInsights)}
          theme="light"
          placementSide="bottom"
          size="lg"
          key={element.name}
        >
          <div
            className={twClassNames(
              'flex flex-row items-center p-2 max-[1024px]:hidden'
            )}
            href={element.link}
          >
            {element.icon}
          </div>
        </ToolTip>
      );
    } else if (['notifications', 'search'].includes(element.name)) {
      temp = (
        <div
          className={twClassNames('flex flex-row items-center p-2', {
            'max-[1024px]:hidden': element.name === 'notifications'
          })}
          id={
            element.name === 'notifications' ? 'beamer-notification' : undefined
          }
          key={element.name}
        >
          {element.name === 'notifications' && (
            <button type="button" aria-label="Notification button">
              {element.icon}
            </button>
          )}
          {element.name === 'search' && (
            <a href={element.link} aria-label="Search button">
              {element.icon}
            </a>
          )}
        </div>
      );
    }
    return temp;
  };

  return (
    <div
      id="header-elements"
      className={twClassNames('flex flex-row items-center p-0 mr-8')}
    >
      <HeaderProducts wrapperClassName="min-[1361px]:hidden max-[1024px]:hidden" />
      {ELEMENTS_WITH_LABEL?.map((element) =>
        headerElementArray.includes(element.name)
          ? elementRender(element)
          : null
      )}

      {headerElementArray.includes('pricing') && (
        <div
          className={twClassNames(
            'flex flex-col items-start w-[112px] h-[38px] py-0 pr-0 pl-2 gap-2 max-[1024px]:hidden'
          )}
        >
          <Hyperlink
            wrapperClassName={twClassNames(
              'flex flex-row items-start p-0 w-[104px] focus:ring-attention-600'
            )}
            href="https://www.browserstack.com/accounts/subscriptions"
          >
            <div
              className={twClassNames(
                'flex flex-row justify-center items-center bg-[#15803d] hover:bg-[#166534] py-[9px] px-[15px] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              )}
            >
              <p
                className={twClassNames(
                  'not-italic font-medium text-sm leading-5 text-white py-0 px-0.5'
                )}
              >
                Buy a Plan
              </p>
            </div>
          </Hyperlink>
        </div>
      )}
    </div>
  );
};

HeaderElements.propTypes = {
  documentation: PropTypes.objectOf(PropTypes.any),
  references: PropTypes.objectOf(PropTypes.any),
  others: PropTypes.objectOf(PropTypes.any),
  documentationLink: PropTypes.string,
  supportLink: PropTypes.string,
  beamerProductId: PropTypes.string,
  showTestInsights: PropTypes.bool,
  headerElementArray: PropTypes.arrayOf(PropTypes.string)
};
HeaderElements.defaultProps = {
  documentation: null,
  references: null,
  others: null,
  documentationLink: '',
  supportLink: '',
  beamerProductId: '',
  showTestInsights: true,
  headerElementArray: []
};

export default HeaderElements;
