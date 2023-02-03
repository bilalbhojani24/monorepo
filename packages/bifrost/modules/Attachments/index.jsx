import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PropTypes from 'prop-types';

import './styles.scss';

const Attachments = ({ wrapperClassName, attachments, icon }) => (
  <div className={wrapperClassName}>
    <ul className="divide-base-200 border-base-200 divide-y rounded-md border sm:col-span-2">
      {attachments.map((attachment) => (
        <li
          className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
          key={attachment.id}
        >
          <div className="flex w-full flex-1 items-center">
            {icon}
            <span className="ml-2 w-0 flex-1 truncate">
              {attachment.fileName}
            </span>
          </div>
          <div className="ml-4 shrink-0">{attachment?.actions}</div>
        </li>
      ))}
    </ul>
  </div>
);

Attachments.propTypes = {
  wrapperClassName: PropTypes.string,
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      fileName: PropTypes.string,
      actions: PropTypes.node,
      id: PropTypes.string
    })
  ),
  icon: PropTypes.node
};
Attachments.defaultProps = {
  wrapperClassName: '',
  attachments: [],
  icon: <AttachFileIcon className="text-base-400 font-light" />
};

export default Attachments;
