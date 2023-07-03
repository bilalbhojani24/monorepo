import React from 'react';
import {
  Button,
  CTACard,
  CTACardActions,
  CTACardContent,
  CTACardMedia
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMCTACard = ({
  containerWrapperClassName,
  description,
  header,
  imageNode,
  isDismissable,
  onClose,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  primaryBtnProps,
  primaryBtnText,
  secondaryBtnProps,
  secondaryBtnText,
  contentWrapperClass
}) => (
  <CTACard
    isDismissable={isDismissable}
    onClose={onClose}
    wrapperClassName={containerWrapperClassName}
  >
    <CTACardContent
      header={header}
      description={description}
      wrapperClassName={contentWrapperClass}
    >
      <CTACardActions
        primaryBtnText={primaryBtnText}
        secondaryBtnText={secondaryBtnText}
        primaryBtnProps={primaryBtnProps}
        secondaryBtnProps={secondaryBtnProps}
        onPrimayBtnClick={onPrimaryBtnClick}
        onSecondaryBtnClick={onSecondaryBtnClick}
      />
    </CTACardContent>
    <CTACardMedia>{imageNode}</CTACardMedia>
  </CTACard>
);

TMCTACard.propTypes = {
  containerWrapperClassName: PropTypes.string,
  description: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  imageNode: PropTypes.node,
  isDismissable: PropTypes.bool,
  onClose: PropTypes.func,
  onPrimaryBtnClick: PropTypes.func.isRequired,
  onSecondaryBtnClick: PropTypes.func,
  primaryBtnProps: PropTypes.shape(Button.propTypes),
  primaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  secondaryBtnProps: PropTypes.shape(Button.propTypes),
  secondaryBtnText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentWrapperClass: PropTypes.string
};

TMCTACard.defaultProps = {
  containerWrapperClassName: '',
  imageNode: null,
  isDismissable: false,
  onClose: () => {},
  onSecondaryBtnClick: () => {},
  primaryBtnProps: {},
  primaryBtnText: '',
  secondaryBtnProps: {},
  secondaryBtnText: '',
  contentWrapperClass: ''
};

export default TMCTACard;
