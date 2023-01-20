import React from 'react';
import { AttachFileOutlinedIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const Attachments = ({ attachments, onRemoveClick }) => {
  if (!attachments.length) return '';

  return (
    <div className="w-full">
      <ul className="divide-base-200 border-base-200 divide-y rounded-md border">
        {attachments.map((attachment) => (
          <li
            key={attachment.name}
            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
          >
            <div className="flex w-0 flex-1 items-center">
              <AttachFileOutlinedIcon
                className="text-base-400 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              <span className="ml-2 w-0 flex-1 truncate">
                {attachment.name}
              </span>
            </div>
            <div className="ml-4 shrink-0">
              <TMButton
                onClick={() => onRemoveClick(attachment)}
                //   colors=""
                variant="minimal"
              >
                Remove
              </TMButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Attachments.propTypes = {
  attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default Attachments;
