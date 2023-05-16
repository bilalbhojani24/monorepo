import React from 'react';
import { twClassNames } from '@browserstack/utils';

import {
  CALLBACK_FUNCTIONS_PROP_TYPE,
  hyperlinkClickHandler
} from '../Header/utils';
import Hyperlink from '../Hyperlink';
import { MdArrowRightAlt, MdOutlinePeopleAlt } from '../Icon';
import ToolsIcon from '../Icon/HeaderIcons/ToolsIcon';

import {
  FOR_TEAMS_PRODUCTS,
  MOBILE_APP_TESTING_PRODUCTS,
  TEST_DEVELOPMENT_PRODUCTS,
  TEST_MANAGEMENT_PRODUCTS,
  TOOL_PRODUCTS,
  WEBSITE_TESTING_PRODUCTS
} from './const/headerProductContainerConstants';

const TITLE_CLASSNAMES =
  'not-italic font-semibold text-sm leading-4 text-[#666666]';
const LINK_CLASSNAMES = 'flex flex-col items-start p-0 w-[254px] gap-5';

const HeaderProductContainer = ({ callbackFunctions }) => {
  const productElementContainer = (
    productIcon,
    productName,
    productDescription,
    productLink
  ) => (
    <Hyperlink
      key={productName}
      isCSR={false}
      wrapperClassName={twClassNames(
        'group flex flex-row items-start w-64 h-10 py-0 px-[10px] gap-[5px]'
      )}
      href={productLink}
      onClick={(e) => {
        hyperlinkClickHandler(
          e,
          productLink,
          callbackFunctions?.onProductLinkClick,
          '_self',
          productName
        );
      }}
    >
      <span>{productIcon}</span>
      <div className={twClassNames('flex flex-col items-start p-0 w-48 h-10')}>
        <p
          className={twClassNames(
            'w-[152px] h-5 not-italic font-semibold text-base leading-5 text-[#333333] group-hover:text-brand-600'
          )}
        >
          {productName}
        </p>
        <p
          className={twClassNames(
            'w-48 h-4 not-italic font-normal text-xs leading-4 text-[#666666] group-hover:text-brand-600'
          )}
        >
          {productDescription}
        </p>
      </div>
    </Hyperlink>
  );

  return (
    <div
      className={twClassNames(
        'flex flex-col w-[933px] items-start p-0 relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.4)]'
      )}
    >
      <div
        className={twClassNames(
          'flex flex-row items-start p-0 rounded w-[933px]'
        )}
      >
        <div
          className={twClassNames(
            'flex flex-col items-start bg-white w-[809px] py-4 pr-[10px] pl-4 gap-[10px]'
          )}
        >
          <div
            className={twClassNames(
              'flex flex-row items-start p-0 gap-[10px] w-[783px]'
            )}
          >
            <div
              className={twClassNames(
                'flex flex-col items-start w-[254px] gap-[22px] pt-0 px-0 pb-[10px]'
              )}
            >
              <div
                className={twClassNames(
                  'flex flex-col items-start p-0 w-[128px] h-6 gap-[5px]'
                )}
              >
                <p className={twClassNames(TITLE_CLASSNAMES)}>
                  Test your websites
                </p>
                <span className={twClassNames('w-[128px] h-px bg-[#dedede]')} />
              </div>
              <div className={twClassNames(LINK_CLASSNAMES)}>
                {WEBSITE_TESTING_PRODUCTS?.map((element) =>
                  productElementContainer(
                    element.icon,
                    element.name,
                    element.description,
                    element.link
                  )
                )}
              </div>
            </div>
            <div
              className={twClassNames(
                'flex flex-col items-start w-[255px] h-[216px] gap-[22px] pt-0 px-0 pb-[10px]'
              )}
            >
              <div
                className={twClassNames(
                  'flex flex-col items-start p-0 w-[150px] h-6 gap-[5px]'
                )}
              >
                <p className={twClassNames(TITLE_CLASSNAMES)}>
                  Test your mobile apps
                </p>
                <span className={twClassNames('w-[150px] h-px bg-[#dedede]')} />
              </div>
              <div className={twClassNames(LINK_CLASSNAMES)}>
                {MOBILE_APP_TESTING_PRODUCTS?.map((element) =>
                  productElementContainer(
                    element.icon,
                    element.name,
                    element.description,
                    element.link
                  )
                )}
              </div>
            </div>
            <div
              className={twClassNames(
                'flex flex-col items-start w-[254px] h-[248px] gap-[10px] p-0'
              )}
            >
              <div
                className={twClassNames(
                  'flex flex-col items-start w-[254px] h-[154px] gap-[22px] pt-0 px-0 pb-[10px]'
                )}
              >
                <div
                  className={twClassNames(
                    'flex flex-col items-start p-0 w-[225px] h-6 gap-[5px]'
                  )}
                >
                  <p className={twClassNames(TITLE_CLASSNAMES)}>
                    Test management & optimization
                  </p>
                  <span
                    className={twClassNames('w-[225px] h-px bg-[#dedede]')}
                  />
                </div>
                <div className={twClassNames(LINK_CLASSNAMES)}>
                  {TEST_MANAGEMENT_PRODUCTS?.map((element) =>
                    productElementContainer(
                      element.icon,
                      element.name,
                      element.description,
                      element.link
                    )
                  )}
                </div>
              </div>
              <div
                className={twClassNames(
                  'flex flex-col items-start w-[254px] h-[84px] gap-[22px] p-0'
                )}
              >
                <div
                  className={twClassNames(
                    'flex flex-col items-start p-0 w-[225px] h-6 gap-[5px]'
                  )}
                >
                  <p className={twClassNames(TITLE_CLASSNAMES)}>
                    Test development
                  </p>
                  <span
                    className={twClassNames('w-[225px] h-px bg-[#dedede]')}
                  />
                </div>
                <div className={twClassNames(LINK_CLASSNAMES)}>
                  {TEST_DEVELOPMENT_PRODUCTS?.map((element) =>
                    productElementContainer(
                      element.icon,
                      element.name,
                      element.description,
                      element.link
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={twClassNames(
              'flex flex-col items-start p-0 gap-[10px] w-[783px] h-[29px]'
            )}
          >
            <span className={twClassNames('h-px w-full bg-[#dedede]')} />
            <div
              className={twClassNames(
                'flex flex-row items-center p-0 gap-0.5 w-[460px] h-[18px]'
              )}
            >
              <p
                className={twClassNames(
                  'not-italic font-normal text-sm leading-4 text-base-600 w-[460px] h-[18px] flex flex-row gap-1 float-left whitespace-nowrap'
                )}
              >
                Use Browserstack with your favourite products. See our
                <Hyperlink
                  isCSR={false}
                  wrapperClassName={twClassNames(
                    'not-italic font-bold text-sm leading-4 text-base-600 hover:text-brand-600'
                  )}
                  href="https://www.browserstack.com/integrations"
                  onClick={(e) => {
                    hyperlinkClickHandler(
                      e,
                      'https://www.browserstack.com/integrations',
                      callbackFunctions?.onProductLinkClick,
                      '_self',
                      'Integrations'
                    );
                  }}
                >
                  Integrations
                  <span>
                    <MdArrowRightAlt className="h-3 w-3" />
                  </span>
                </Hyperlink>
              </p>
            </div>
          </div>
        </div>
        <div
          className={twClassNames(
            'flex flex-col items-start bg-[#f7f7f7] w-[124px] h-[319px] gap-4 py-4 px-2.5'
          )}
        >
          <div
            className={twClassNames(
              'flex flex-col items-start p-0 w-24 gap-3 py-0'
            )}
          >
            <div
              className={twClassNames(
                'flex flex-col items-start p-0 w-24 gap-[5px]'
              )}
            >
              <span
                className={twClassNames(
                  'flex flex-row items-center p-0 w-24 gap-1'
                )}
              >
                <MdOutlinePeopleAlt
                  className={twClassNames('w-3 h-3 text-[#666666]')}
                />
                <p
                  className={twClassNames(
                    'w-[70px] not-italic font-semibold text-sm leading-4 text-[#666666]'
                  )}
                >
                  For Teams
                </p>
              </span>
              <span className={twClassNames('w-24 h-px bg-[#dedede]')} />
            </div>
            <div className={twClassNames('flex flex-col items-start p-0 w-24')}>
              {FOR_TEAMS_PRODUCTS.map((product) => (
                <Hyperlink
                  key={product.name}
                  isCSR={false}
                  href={product.link}
                  wrapperClassName={twClassNames(
                    'flex flex-row items-start w-24 py-[5px] px-4'
                  )}
                  onClick={(e) => {
                    hyperlinkClickHandler(
                      e,
                      product.link,
                      callbackFunctions?.onProductLinkClick,
                      '_self',
                      product.name
                    );
                  }}
                >
                  <span
                    className={twClassNames(
                      'w-16 not-italic font-normal text-sm leading-4 text-[#666666] hover:text-brand-600'
                    )}
                  >
                    {product.name}
                  </span>
                </Hyperlink>
              ))}
            </div>
          </div>
          <div
            className={twClassNames(
              'flex flex-col items-start p-0 w-24 gap-3 py-0'
            )}
          >
            <div
              className={twClassNames(
                'flex flex-col items-start p-0 w-24 gap-[5px]'
              )}
            >
              <span
                className={twClassNames(
                  'flex flex-row items-center p-0 w-24 gap-1'
                )}
              >
                <ToolsIcon className={twClassNames('w-3 h-3')} />
                <p
                  className={twClassNames(
                    'w-9 not-italic font-semibold text-sm leading-4 text-[#666666]'
                  )}
                >
                  Tools
                </p>
              </span>
              <span className={twClassNames('w-14 h-px bg-[#dedede]')} />
            </div>
            <div
              className={twClassNames(
                'flex flex-col items-start p-0 w-24 gap-2.5'
              )}
            >
              {TOOL_PRODUCTS.map((product) => (
                <Hyperlink
                  key={product.name}
                  isCSR={false}
                  href={product.link}
                  wrapperClassName={twClassNames(
                    'flex flex-row items-start w-24 py-[5px] px-4'
                  )}
                  onClick={(e) => {
                    hyperlinkClickHandler(
                      e,
                      product.link,
                      callbackFunctions?.onProductLinkClick,
                      '_self',
                      product.name
                    );
                  }}
                >
                  <span
                    className={twClassNames(
                      'w-16 not-italic font-normal text-sm leading-4 text-[#666666] hover:text-brand-600'
                    )}
                  >
                    {product.name}
                  </span>
                </Hyperlink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderProductContainer;

HeaderProductContainer.propTypes = {
  callbackFunctions: CALLBACK_FUNCTIONS_PROP_TYPE
};
HeaderProductContainer.defaultProps = {
  callbackFunctions: null
};
