import React from 'react';
import { Bars2Icon, Button } from '@browserstack/bifrost';

const WidgetHeader = () => (
  <div className="bg-base-50 flex items-center rounded-t-md py-1 px-4 ">
    <Button
      icon={<Bars2Icon />}
      wrapperClassName="drag-handle w-4 h-4 border-0 text-base-400 p-0"
    />
  </div>
);

export default WidgetHeader;
