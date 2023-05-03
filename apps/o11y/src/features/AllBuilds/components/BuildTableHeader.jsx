import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';

import { TABLE_CLASSES } from '../constants';

function BuildTableHeader() {
  return (
    <O11yTableRow>
      <O11yTableCell wrapperClassName={TABLE_CLASSES.HEADER_COMMON} isSticky>
        BUILD
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.TEST,
          TABLE_CLASSES.HEADER_COMMON
        )}
        isSticky
      >
        <span>TESTS STATUS</span>
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.DURATION,
          TABLE_CLASSES.HEADER_COMMON
        )}
        isSticky
      >
        DURATION
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.FAILURE_CATEGORY,
          TABLE_CLASSES.HEADER_COMMON
        )}
        isSticky
      >
        FAILURE CATEGORIES
      </O11yTableCell>
    </O11yTableRow>
  );
}

export default BuildTableHeader;
