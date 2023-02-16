import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import HeaderBrand from '../HeaderBrand';
import HeaderElements from '../HeaderElements';
import HeaderProducts from '../HeaderProducts';

import useHeader from './useHeader';

import './styles.scss';

const Header = ({
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
  headerElementArray
}) => {
  const { productsToShow, headerRef } = useHeader();
  return (
    <nav
      ref={headerRef}
      className={twClassNames(
        'h-16 w-auto flex flex-row items-center p-0 bg-base-800 gap-4',
        wrapperClassName
      )}
    >
      <HeaderBrand
        productName={productName}
        productLink={productLink}
        release={release}
      />
      <HeaderProducts
        wrapperClassName="max-[1360px]:hidden"
        productCount={productsToShow}
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
          headerElementArray={headerElementArray}
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
  showTestInsights: PropTypes.bool,
  headerElementArray: PropTypes.arrayOf(PropTypes.string)
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
  showTestInsights: true,
  headerElementArray: []
};

export default Header;
