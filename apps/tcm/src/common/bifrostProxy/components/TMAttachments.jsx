/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Attachments, MdOutlineAttachFile } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { TMButton } from '../index';

const TMAttachments = ({
  attachments,
  onActionClick,
  wrapperClassName,
  icon
}) => {
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
      icon={icon || <MdOutlineAttachFile className="h-5 w-5" />}
      wrapperClassName={wrapperClassName}
    />
  );
};

TMAttachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onActionClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string,
  icon: PropTypes.node
};

TMAttachments.defaultProps = {
  wrapperClassName: '',
  icon: null
};

export default TMAttachments;
