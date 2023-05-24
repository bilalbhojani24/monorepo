import React, { Fragment, useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import AccessibleTooltip from '../Header/components/AccessibleTooltip';
import {
  CALLBACK_FUNCTIONS_PROP_TYPE,
  hyperlinkClickHandler
} from '../Header/utils';
import HeaderProducts from '../HeaderProducts';
import Hyperlink from '../Hyperlink';

import GetHelp from './components/GetHelp';
import SearchField from './components/SearchField';
import {
  ACCOUNT_ARRAY,
  ELEMENTS_WITH_LABEL
} from './const/headerElementsConstants';

const ACCOUNT_LINKS_CLASSNAMES =
  'flex flex-row items-start p-2 gap-2 w-full hover:bg-[#edf8ff]';
const LINKS_TEXT_CLASSNAMES =
  'not-italic font-normal text-sm leading-4 text-black';

const getAccountDropdownHref = (item, supportLink, contactLink) => {
  switch (item.name) {
    case 'Support':
      return supportLink;
    case 'Contact':
      return contactLink;
    default:
      return item.link;
  }
};

const HeaderElements = ({
  callbackFunctions,
  documentation,
  references,
  others,
  documentationLink,
  supportLink,
  showTestInsights,
  beamerProductId,
  beamerOverlayTopProperty,
  headerElementArray,
  planButtonVisible,
  isFreeUser,
  onSignoutClick,
  planPricingLink,
  contactLink,
  buyPlanText,
  buyPlanLink,
  buyPlanTarget
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBarRef = useRef(null);

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

  const attachCSSToBeamer = () => {
    const beamerOverlayContainer = document.getElementById('beamerOverlay');
    if (beamerOverlayContainer) {
      beamerOverlayContainer.style.top = `${beamerOverlayTopProperty}px`;
    }
  };

  const focusSearchInput = () => {
    searchBarRef.current?.focus();
  };

  const searchSlideover = (
    <Transition show={isSearchOpen} unmount={false}>
      <Transition.Child
        appear="true"
        unmount={false}
        enter="ease-in duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="presentation"
          className={twClassNames(`bg-base-500 fixed inset-0 z-10 opacity-75`)}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        appear="true"
        unmount={false}
        enter="transform transition ease-out duration-500"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transform transition ease-out duration-500"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
        afterEnter={focusSearchInput}
      >
        <div className="fixed right-0 top-16 z-10 flex items-start">
          <SearchField
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            ref={searchBarRef}
          />
        </div>
      </Transition.Child>
    </Transition>
  );

  const accountPopover = (productSupportLink, testInsight) => (
    <div
      className={twClassNames(
        'flex flex-col items-start bg-white pt-2 pb-2.5 px-0 gap-2.5'
      )}
    >
      <div
        className={twClassNames(
          'flex flex-row items-start py-0 px-4 gap-5 border-b pb-2.5 border-[#dddddd]'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-0.5 w-[208px]'
          )}
        >
          {ACCOUNT_ARRAY.map((element) => {
            const redirectionUTL = getAccountDropdownHref(
              element,
              productSupportLink,
              contactLink
            );
            return (
              <Hyperlink
                key={element.name}
                isCSR={false}
                wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
                href={redirectionUTL}
                onClick={(e) =>
                  hyperlinkClickHandler(
                    e,
                    redirectionUTL,
                    callbackFunctions?.onAccountDropdownOptionClick,
                    '_self',
                    element.name
                  )
                }
              >
                <p className={twClassNames(LINKS_TEXT_CLASSNAMES)}>
                  {element.name}
                </p>
              </Hyperlink>
            );
          })}
          {testInsight && (
            <Hyperlink
              isCSR={false}
              wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
              href="https://www.browserstack.com/accounts/usage-reporting"
              onClick={(e) =>
                hyperlinkClickHandler(
                  e,
                  'https://www.browserstack.com/accounts/usage-reporting',
                  callbackFunctions?.onAccountDropdownOptionClick,
                  '_self',
                  'Test insights'
                )
              }
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
      <div
        className={twClassNames('flex flex-row items-start py-0 px-4 gap-5')}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-1 w-[208px]'
          )}
        >
          <Hyperlink
            isCSR={false}
            wrapperClassName={twClassNames(ACCOUNT_LINKS_CLASSNAMES)}
            href="https://www.browserstack.com/users/sign_out"
            onClick={(e) => {
              hyperlinkClickHandler(
                e,
                'https://www.browserstack.com/users/sign_out',
                callbackFunctions?.onAccountDropdownOptionClick,
                '_self',
                'Sign out'
              );
              onSignoutClick?.(e);
            }}
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

  const hyperlinkElements = (elementOptions, handleClickCb) => (
    <Hyperlink
      isCSR={false}
      wrapperClassName={twClassNames(
        'group lg:flex flex-row items-center py-2 px-3 hover:text-base-100 hidden'
      )}
      href={elementOptions.link}
      key={elementOptions.name}
      onClick={(e) =>
        hyperlinkClickHandler(e, elementOptions.link, handleClickCb)
      }
    >
      <div
        className={twClassNames(
          'flex flex-row justify-center items-center p-0 gap-1.5 w-[126px]'
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
      </div>
    </Hyperlink>
  );

  const elementRender = (element) => {
    let temp = null;
    if (element.name === 'team') {
      temp = hyperlinkElements(element, callbackFunctions?.onInviteTeamClick);
    } else if (element.name === 'pricing') {
      const newElements = { ...element };
      newElements.link = planPricingLink;
      temp = hyperlinkElements(
        newElements,
        callbackFunctions?.onPlanAndPricingClick
      );
    } else if (element.name === 'help') {
      temp = (
        <GetHelp
          elementOptions={element}
          callbackFunctions={callbackFunctions}
          {...{
            documentation,
            references,
            others,
            documentationLink,
            supportLink
          }}
        />
      );
    } else if (element.name === 'account') {
      temp = (
        <AccessibleTooltip
          content={accountPopover(supportLink, showTestInsights)}
          ariaLabel="account popover"
        >
          <div
            className={twClassNames('lg:flex flex-row items-center p-2 hidden')}
          >
            {element.icon}
          </div>
        </AccessibleTooltip>
      );
    } else if (['notifications', 'search'].includes(element.name)) {
      temp = (
        <div
          className={twClassNames('flex flex-row items-center p-2', {
            '[@media(max-width:1023px)]:hidden max-[1023px]:hidden':
              element.name === 'notifications'
          })}
          id={
            element.name === 'notifications' ? 'beamer-notification' : undefined
          }
          key={element.name}
        >
          {element.name === 'notifications' && (
            <button
              type="button"
              aria-label="Notification button"
              onClick={() => {
                attachCSSToBeamer();
                callbackFunctions?.onNotificationClick();
              }}
            >
              {element.icon}
            </button>
          )}
          {element.name === 'search' && (
            <button
              type="button"
              aria-label="Search button"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                callbackFunctions?.onSearchClick();
              }}
            >
              {element.icon}
            </button>
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
      <HeaderProducts wrapperClassName="[@media(min-width:1361px)]:hidden min-[1361px]:hidden" />
      {ELEMENTS_WITH_LABEL?.map((element) => (
        <React.Fragment key={element.name}>
          {headerElementArray.includes(element.name)
            ? elementRender(element)
            : null}
        </React.Fragment>
      ))}
      {searchSlideover}
      {planButtonVisible && (
        <div
          className={twClassNames(
            'lg:flex flex-col items-start h-[38px] py-0 pr-0 pl-2 gap-2 hidden'
          )}
        >
          <Hyperlink
            isCSR={false}
            wrapperClassName={twClassNames(
              'flex flex-row items-start p-0 focus:ring-attention-600'
            )}
            target={buyPlanTarget}
            href={buyPlanLink}
            onClick={(e) => {
              hyperlinkClickHandler(
                e,
                buyPlanLink,
                callbackFunctions?.buyPlanClick,
                buyPlanTarget
              );
            }}
          >
            <div
              className={twClassNames(
                'flex flex-row justify-center items-center bg-[#15803d] hover:bg-[#166534] py-[9px] px-[15px] rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              )}
            >
              <p
                className={twClassNames(
                  'not-italic font-medium text-sm leading-5 text-white py-0 px-0.5 float-left whitespace-nowrap'
                )}
              >
                {isFreeUser ? buyPlanText : 'Upgrade'}
              </p>
            </div>
          </Hyperlink>
        </div>
      )}
    </div>
  );
};

HeaderElements.propTypes = {
  callbackFunctions: CALLBACK_FUNCTIONS_PROP_TYPE,
  documentation: PropTypes.objectOf(PropTypes.any),
  references: PropTypes.objectOf(PropTypes.any),
  others: PropTypes.objectOf(PropTypes.any),
  documentationLink: PropTypes.string,
  supportLink: PropTypes.string,
  beamerProductId: PropTypes.string,
  beamerOverlayTopProperty: PropTypes.number,
  showTestInsights: PropTypes.bool,
  headerElementArray: PropTypes.arrayOf(PropTypes.string),
  planButtonVisible: PropTypes.bool,
  isFreeUser: PropTypes.bool,
  onSignoutClick: PropTypes.func,
  planPricingLink: PropTypes.string,
  buyPlanTarget: PropTypes.string,
  buyPlanLink: PropTypes.string,
  contactLink: PropTypes.bool,
  buyPlanText: PropTypes.string
};
HeaderElements.defaultProps = {
  callbackFunctions: null,
  documentation: null,
  references: null,
  others: null,
  documentationLink: '',
  supportLink: '',
  beamerProductId: '',
  beamerOverlayTopProperty: 64,
  showTestInsights: true,
  headerElementArray: [],
  planButtonVisible: true,
  isFreeUser: true,
  onSignoutClick: null,
  buyPlanTarget: '_self',
  planPricingLink: 'https://www.browserstack.com/accounts/subscriptions',
  buyPlanLink: 'https://www.browserstack.com/accounts/subscriptions',
  contactLink: 'https://www.browserstack.com/contact?ref=header',
  buyPlanText: 'Buy a Plan'
};

export default HeaderElements;
