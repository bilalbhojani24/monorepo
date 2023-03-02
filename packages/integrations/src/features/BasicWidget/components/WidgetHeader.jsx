import React from 'react';
import { Bars2Icon, Button, MdClear } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const WidgetHeader = ({ handleClose }) => (
  <div className="bg-base-50 flex items-center justify-between rounded-t-md py-1 px-4 ">
    <Button
      icon={<Bars2Icon />}
      wrapperClassName="drag-handle w-4 h-4 border-0 text-base-400 p-0 bg-inherit hover:bg-inherit focus:ring-0 cursor-grab"
    />
    <Button wrapperClassName="" icon={<MdClear />} onClick={handleClose} />
  </div>
);

WidgetHeader.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default WidgetHeader;
