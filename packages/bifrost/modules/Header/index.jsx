import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import HeaderBrand from '../HeaderBrand';
import HeaderElements from '../HeaderElements';
import HeaderProducts from '../HeaderProducts';

import useHeader from './useHeader';

import './styles.scss';

const Header = ({
  headerID,
  wrapperClassName,
  productName,
  productLink,
  release,
  documentation,
  references,
  others,
  documentationLink,
  supportLink,
  showTestInsights,
  beamerProductId,
  beamerOverlayTopProperty,
  headerElementArray,
  productArray,
  planButtonVisible,
  isFreeUser
}) => {
  const { productsToShow, headerRef } = useHeader();
  return (
    <nav
      ref={headerRef}
      className={twClassNames(
        'h-16 w-full flex flex-row items-center p-0 bg-[#1d2736] gap-4 fixed top-0 z-10',
        wrapperClassName
      )}
      id={headerID || null}
    >
      <HeaderBrand
        productName={productName}
        productLink={productLink}
        release={release}
      />
      <HeaderProducts
        wrapperClassName="max-[1360px]:hidden"
        productCount={productsToShow}
        productArray={productArray}
      />
      <div className="float-right ml-auto">
        <HeaderElements
          documentation={documentation}
          references={references}
          others={others}
          documentationLink={documentationLink}
          supportLink={supportLink}
          showTestInsights={showTestInsights}
          beamerProductId={beamerProductId}
          beamerOverlayTopProperty={beamerOverlayTopProperty}
          headerElementArray={headerElementArray}
          planButtonVisible={planButtonVisible}
          isFreeUser={isFreeUser}
        />
      </div>
    </nav>
  );
};

Header.propTypes = {
  wrapperClassName: PropTypes.string,
  productName: PropTypes.string,
  productLink: PropTypes.string,
  release: PropTypes.string,
  documentation: PropTypes.objectOf(PropTypes.any),
  references: PropTypes.objectOf(PropTypes.any),
  others: PropTypes.objectOf(PropTypes.any),
  documentationLink: PropTypes.string,
  supportLink: PropTypes.string,
  beamerProductId: PropTypes.string,
  beamerOverlayTopProperty: PropTypes.number,
  showTestInsights: PropTypes.bool,
  headerElementArray: PropTypes.arrayOf(PropTypes.string),
  headerID: PropTypes.string,
  productArray: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, link: PropTypes.string })
  ),
  planButtonVisible: PropTypes.bool,
  isFreeUser: PropTypes.bool
};
Header.defaultProps = {
  wrapperClassName: '',
  productName: '',
  productLink: '',
  release: '',
  documentation: null,
  references: null,
  others: null,
  documentationLink: '',
  supportLink: '',
  beamerProductId: '',
  beamerOverlayTopProperty: 64,
  showTestInsights: true,
  headerElementArray: [],
  headerID: '',
  productArray: [],
  planButtonVisible: true,
  isFreeUser: true
};

export default Header;
