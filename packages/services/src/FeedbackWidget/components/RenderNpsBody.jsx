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
    <div className="flex items-center justify-center px-3">
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
            'flex-1 rounded-none border-base-300 border-r-0 flex items-center justify-center p-3 focus:ring-2 focus:ring-brand-500',
            {
              'rounded-l-md': index === 0,
              'rounded-r-md border-r-1': index === 9
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
