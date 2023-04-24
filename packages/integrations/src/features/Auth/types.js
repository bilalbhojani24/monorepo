import PropTypes from 'prop-types';

const FieldType = {
  key: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

export const OAuthMetaType = {
  logo_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  feature_list: PropTypes.arrayOf(PropTypes.string)
};

export const APITokenMetaType = {
  logo_url: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape(FieldType))
};
