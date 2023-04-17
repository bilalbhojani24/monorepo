import PropTypes from 'prop-types';

export const CreateIssueOptionsMetaDataType = PropTypes.shape({
  [PropTypes.string]: PropTypes.shape()
});

export const CreateIssueOptionsType = PropTypes.shape({
  successCallback: PropTypes.func,
  errorCallback: PropTypes.func,
  metaData: CreateIssueOptionsMetaDataType
});
