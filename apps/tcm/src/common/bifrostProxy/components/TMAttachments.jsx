/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Attachments } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { TMButton } from '../index';

const TMAttachments = ({ attachments, onActionClick, wrapperClassName }) => {
  if (!attachments?.length) return '';

  return (
    <Attachments
      attachments={attachments.map((item) => ({
        fileName: item.name,
        actions: (
          <TMButton onClick={() => onActionClick(item)} variant="minimal">
            {item.actionName || 'Remove'}
          </TMButton>
        )
      }))}
      wrapperClassName={wrapperClassName}
    />
  );
};

TMAttachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActionClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};

TMAttachments.defaultProps = {
  wrapperClassName: ''
};

export default TMAttachments;
