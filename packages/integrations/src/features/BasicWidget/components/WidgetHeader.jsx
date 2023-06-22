import React from 'react';
import { Button, MdClear, MdDragHandle } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const WidgetHeader = ({ handleClose }) => (
  <div className="bg-base-50 flex items-center justify-between rounded-t-md px-4 py-1 ">
    <Button
      ariaLabel="move-widget"
      icon={<MdDragHandle className="h-6 w-6" />}
      wrapperClassName="drag-handle w-6 h-6 border-0 text-base-400 p-0 bg-inherit hover:bg-inherit focus:ring-0 focus:ring-offset-0 focus:ring-offset-0cursor-grab"
    />
    <Button
      ariaLabel="close-widget"
      wrapperClassName="hover:bg-inherit border-0 shadow-none bg-inherit focus:ring-0 focus:ring-offset-0 px-0"
      colors="white"
      icon={<MdClear className="text-base-400 text-xl" />}
      onClick={handleClose}
    />
  </div>
);

WidgetHeader.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default WidgetHeader;
