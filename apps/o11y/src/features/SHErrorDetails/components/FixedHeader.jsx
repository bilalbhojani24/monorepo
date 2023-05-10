import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';

import { PLATFORM_HEADER_CELLS_MAPPING } from '../constants';

const FixedPlatformHeader = () => (
  <O11yTableRow>
    {Object.keys(PLATFORM_HEADER_CELLS_MAPPING).map((key) => (
      <O11yTableCell
        key={key}
        wrapperClassName={twClassNames(
          PLATFORM_HEADER_CELLS_MAPPING[key].defaultClass
        )}
      >
        <div className="text-xs font-medium leading-4">
          {PLATFORM_HEADER_CELLS_MAPPING[key].name}
        </div>
      </O11yTableCell>
    ))}
  </O11yTableRow>
);

export default FixedPlatformHeader;
