import React from 'react';
import PropTypes from 'prop-types';

import { PaperClipIcon } from '../Icon';

import './styles.scss';

const Attachments = ({ wrapperClassName, attachments }) => (
  <div className={wrapperClassName}>
    <ul className="divide-base-200 border-base-200 divide-y rounded-md border sm:col-span-2">
      {attachments.map((attachment) => (
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
          <div className="flex w-full flex-1 items-center">
            <PaperClipIcon className="h-5 w-5 font-light" />
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
      // actions: PropTypes.arrayOf(
      //   PropTypes.shape({
      //     colors: PropTypes.string,
      //     variant: PropTypes.string,
      //     size: PropTypes.string,
      //     children: PropTypes.string
      //   })
      // )
      actions: PropTypes.node
    })
  )
};
Attachments.defaultProps = {
  wrapperClassName: '',
  attachments: []
};

export default Attachments;
