import React, { Fragment, useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import Button from '../Button';
import HeaderProducts from '../HeaderProducts';
import Hyperlink from '../Hyperlink';
import {
  ChevronDownIcon,
  MdArrowRightAlt,
  MdClose,
  MdSearch,
  MdSubdirectoryArrowLeft
} from '../Icon';
// import NotebookIcon from '../Icon/HeaderIcons/NotebookIcon';
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
  beamerOverlayTopProperty,
  headerElementArray,
  planButtonVisible,
  isFreeUser
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const onSubmitSearch = () => {
    if (searchValue) {
      window.location.href = `https://www.browserstack.com/search?query=${searchValue}&type=all`;
    }
  };

  const focusSearchInput = () => {
    searchBarRef.current?.focus();
  };

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
          <div
            className={twClassNames(
              `relative flex h-full flex-col overflow-auto bg-white shadow-xl w-screen inset-0`
            )}
          >
            <div
              className={twClassNames(
                'flex flex-col justify-center items-center h-16 bg-base-50 w-full'
              )}
            >
              <div
                className={twClassNames(
                  'relative rounded-md shadow-sm max-[1023px]:w-11/12 min-[1024px]:w-[940px]'
                )}
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdSearch className="text-base-500 h-5 w-5" />
                </div>
                <input
                  type="text"
                  className={twClassNames(
                    'block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm pl-10 pr-10'
                  )}
                  placeholder="Search across browserstack.com"
                  value={searchValue}
                  ref={searchBarRef}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSubmitSearch();
                    if (e.key === 'Escape') setIsSearchOpen(!isSearchOpen);
                  }}
                />
                <div
                  className={twClassNames(
                    'absolute inset-y-0 right-0 flex items-center pr-3 gap-2'
                  )}
                >
                  <Button
                    variant="minimal"
                    colors="white"
                    isIconOnlyButton
                    icon={<MdClose className="text-base-500 h-5 w-5" />}
                    onClick={() => setSearchValue('')}
                    wrapperClassName="p-0"
                  />
                  {searchValue && (
                    <Button
                      colors="white"
                      size="extra-small"
                      iconPlacement="end"
                      icon={
                        <MdSubdirectoryArrowLeft className="text-base-500 h-4 w-4" />
                      }
                      wrapperClassName="py-1"
                      onClick={onSubmitSearch}
                    >
                      Press
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition>
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
      <div
        className={twClassNames('flex flex-row items-start py-0 px-4 gap-5')}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start p-0 gap-1 w-[208px]'
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
        'group flex flex-row items-center py-2 px-3 hover:text-base-100 max-[1023px]:hidden'
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
            'not-italic font-medium text-sm leading-5 text-base-300 group-hover:text-base-100 float-left whitespace-nowrap'
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
      wrapperClassName="py-0"
      triggerOnTouch
      triggerAriaLabel="help popover"
    >
      <div
        className={twClassNames(
          'group flex flex-row items-center py-2 px-3 hover:text-base-100 max-[1229px]:hidden'
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
          'group flex flex-row items-center p-2 hover:text-base-100 min-[1230px]:hidden max-[1023px]:hidden'
        )}
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
          wrapperClassName="py-0"
          triggerOnTouch
          triggerAriaLabel="account popover"
        >
          <div
            className={twClassNames(
              'flex flex-row items-center p-2 max-[1023px]:hidden'
            )}
          >
            {element.icon}
          </div>
        </ToolTip>
      );
    } else if (['notifications', 'search'].includes(element.name)) {
      temp = (
        <div
          className={twClassNames('flex flex-row items-center p-2', {
            'max-[1023px]:hidden': element.name === 'notifications'
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
              onClick={attachCSSToBeamer}
            >
              {element.icon}
            </button>
          )}
          {element.name === 'search' && (
            <button
              type="button"
              aria-label="Search button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
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
      <HeaderProducts wrapperClassName="min-[1361px]:hidden max-[1023px]:hidden" />
      {ELEMENTS_WITH_LABEL?.map((element) =>
        headerElementArray.includes(element.name)
          ? elementRender(element)
          : null
      )}
      {searchSlideover}
      {planButtonVisible && (
        <div
          className={twClassNames(
            'flex flex-col items-start w-[112px] h-[38px] py-0 pr-0 pl-2 gap-2 max-[1023px]:hidden'
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
                {isFreeUser ? 'Buy a Plan' : 'Upgrade'}
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
  beamerOverlayTopProperty: PropTypes.number,
  showTestInsights: PropTypes.bool,
  headerElementArray: PropTypes.arrayOf(PropTypes.string),
  planButtonVisible: PropTypes.bool,
  isFreeUser: PropTypes.bool
};
HeaderElements.defaultProps = {
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
  isFreeUser: true
};

export default HeaderElements;
