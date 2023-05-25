import React, { useContext } from 'react';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { npsConstants } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const RenderNpsBody = () => {
  const { selectedNPS, setSelectedNPS, handleClick } = useContext(
    FeedbackWidgetContextData
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      {npsConstants.map((item, index) => (
        <Button
          key={item.id}
          colors={selectedNPS === item.id ? 'brand' : 'white'}
          iconOnly
          onClick={() => {
            setSelectedNPS(item.id);
            handleClick();
          }}
          wrapperClassName={twClassNames(
            'w-[42.5px] rounded-none border-r-0 flex items-center justify-center',
            {
              'rounded-l-md': index === 0,
              'rounded-r-md border-r-1 border-base-300': index === 9
            }
          )}
          size="lg"
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default RenderNpsBody;
