import PropTypes from 'prop-types';

export const hyperlinkClickHandler = (e, url, cb, target = '_self', data) => {
  cb?.(data);
  e.preventDefault();
  window.open(url, target);
};

export const CALLBACK_FUNCTIONS_PROP_TYPE = PropTypes.shape({
  buyPlanClick: PropTypes.func,
  onSearchClick: PropTypes.func,
  onNotificationClick: PropTypes.func,
  onInviteTeamClick: PropTypes.func,
  onPlanAndPricingClick: PropTypes.func,
  onAccountDropdownOptionClick: PropTypes.func,
  onHelpDropdownOptionClick: PropTypes.func,
  onProductLinkClick: PropTypes.func
});
