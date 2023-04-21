/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { VIEWER_FIELDS } from '../../constants';
import { useNetwork } from '../../state/Context';
import { initialState } from '../../state/reducer';
import { isWidthAvailableToShowWaterfall } from '../../utils';

const NetworkTableHeader = ({ showWaterfall }) => {
  const { state, actions } = useNetwork();
  const selectedSort = state.get('sort');
  const containerWidth = state.get('containerWidth');
  const isWaterfall =
    showWaterfall && isWidthAvailableToShowWaterfall(containerWidth);

  const onSort = (key) => {
    if (selectedSort.key !== key) {
      actions.updateSort({ key, isAcs: true });
      return;
    }
    if (selectedSort.key === key && selectedSort.isAcs) {
      actions.updateSort({ key, isAcs: false });
      return;
    }
    if (selectedSort.key === key && !selectedSort.isAcs) {
      actions.updateSort({
        key: initialState.get('sort').key,
        isAcs: initialState.get('sort').isAcs
      });
    }
  };

  return (
    <TableHead wrapperClassName="sticky top-0">
      <TableRow>
        {Object.entries(VIEWER_FIELDS).map(
          ([datakey, { name, key, columnWidth }]) => (
            <TableCell
              key={datakey}
              wrapperClassName={twClassNames(
                'py-2 hover:bg-base-100 bg-base-50 border-0 border-x border-x-base-300 relative',
                columnWidth,
                {
                  'w-2/6': key === 'time'
                }
              )}
              variant="header"
            >
              <hr className="text-base-300 absolute top-0 left-0 w-full" />
              <hr className="text-base-300 absolute bottom-[-1px] left-0 w-full" />
              <button
                className="relative flex w-full items-center justify-between"
                type="button"
                onClick={() => onSort(key)}
              >
                <div className="text-xs font-medium uppercase tracking-wider">
                  {name}
                  {isWaterfall && key === 'time' && ' (Waterfall)'}
                </div>
                <div className="flex flex-col justify-between">
                  <MdKeyboardArrowUp
                    fontSize="inherit"
                    title="Up arrow"
                    aria-hidden="false"
                    role="img"
                    className={twClassNames('text-xs', {
                      'text-brand-600':
                        selectedSort.key === key && selectedSort.isAcs,
                      'text-base-300':
                        selectedSort.key === key && !selectedSort.isAcs
                    })}
                  />
                  <MdKeyboardArrowDown
                    fontSize="inherit"
                    title="Down arrow"
                    aria-hidden="false"
                    role="img"
                    className={twClassNames('text-xs', {
                      'text-brand-600':
                        selectedSort.key === key && !selectedSort.isAcs,
                      'text-base-300':
                        selectedSort.key === key && selectedSort.isAcs
                    })}
                  />
                </div>
              </button>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

NetworkTableHeader.propTypes = {
  showWaterfall: PropTypes.bool
};

NetworkTableHeader.defaultProps = {
  showWaterfall: true
};

export default NetworkTableHeader;
