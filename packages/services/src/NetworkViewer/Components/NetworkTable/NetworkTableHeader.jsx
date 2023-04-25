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
import { NL_EVENTS } from '../../nlEvents';
import { useNetwork } from '../../state/Context';
import { initialState } from '../../state/reducer';
import { isWidthAvailableToShowWaterfall } from '../../utils';

const NetworkTableHeader = ({
  showWaterfall,
  shouldShowLimitedCols,
  tableHeaderClassName
}) => {
  const { state, actions } = useNetwork();
  const selectedSort = state.get('sort');
  const containerWidth = state.get('containerWidth');
  const isWaterfall =
    showWaterfall && isWidthAvailableToShowWaterfall(containerWidth);

  const onSort = (key) => {
    if (selectedSort.key !== key) {
      actions.updateSort({ key, isAcs: true });
      window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
        event: NL_EVENTS.SORT_BY_CLICKED,
        data: {
          key,
          isAcs: true
        }
      });
      return;
    }
    if (selectedSort.key === key && selectedSort.isAcs) {
      actions.updateSort({ key, isAcs: false });
      window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
        event: NL_EVENTS.SORT_BY_CLICKED,
        data: {
          key,
          isAcs: false
        }
      });
      return;
    }
    if (selectedSort.key === key && !selectedSort.isAcs) {
      const sortConfig = {
        key: initialState.get('sort').key,
        isAcs: initialState.get('sort').isAcs
      };
      actions.updateSort(sortConfig);
      window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
        event: NL_EVENTS.SORT_BY_CLICKED,
        data: sortConfig
      });
    }
  };

  return (
    <TableHead
      wrapperClassName={twClassNames('sticky top-[70px]', tableHeaderClassName)}
    >
      <TableRow>
        {Object.entries(VIEWER_FIELDS).map(
          ([datakey, { name, key, columnWidth }], idx) => (
            <TableCell
              key={datakey}
              wrapperClassName={twClassNames(
                'py-2 hover:bg-base-100 bg-base-50 border-0 border-x border-x-base-300 relative',
                columnWidth,
                {
                  hidden: idx > 0 && shouldShowLimitedCols,
                  'border-r-0': shouldShowLimitedCols
                }
              )}
              variant="header"
            >
              <hr className="text-base-300 absolute left-0 top-0 w-full" />
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
  showWaterfall: PropTypes.bool,
  shouldShowLimitedCols: PropTypes.bool,
  tableHeaderClassName: PropTypes.string.isRequired
};

NetworkTableHeader.defaultProps = {
  showWaterfall: true,
  shouldShowLimitedCols: false
};

export default NetworkTableHeader;
