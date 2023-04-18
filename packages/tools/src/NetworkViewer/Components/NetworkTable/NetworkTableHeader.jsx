import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from '@browserstack/bifrost';
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
    <thead className="network-table-header">
      <tr>
        {Object.entries(VIEWER_FIELDS).map(
          ([datakey, { name, key, columnWidth }]) => (
            <th
              key={datakey}
              onClick={() => onSort(key)}
              style={
                columnWidth ? { width: `${columnWidth(containerWidth)}px` } : {}
              }
            >
              <div className="network-table-header__container">
                <div className="network-table-header__name">
                  {name}
                  {isWaterfall && key === 'time' && ' (Waterfall)'}
                </div>
                <MdKeyboardArrowUp
                  fontSize="inherit"
                  title="Up arrow"
                  aria-hidden="false"
                  role="img"
                  className={twClassNames('network-table-header__up', {
                    'network-table-header__up--selected':
                      selectedSort.key === key && selectedSort.isAcs,
                    'network-table-header__up--disabled':
                      selectedSort.key === key && !selectedSort.isAcs
                  })}
                />
                <MdKeyboardArrowDown
                  fontSize="inherit"
                  title="Down arrow"
                  aria-hidden="false"
                  role="img"
                  className={twClassNames('network-table-header__down', {
                    'network-table-header__down--selected':
                      selectedSort.key === key && !selectedSort.isAcs,
                    'network-table-header__down--disabled':
                      selectedSort.key === key && selectedSort.isAcs
                  })}
                />
              </div>
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

NetworkTableHeader.propTypes = {
  showWaterfall: PropTypes.bool
};

NetworkTableHeader.defaultProps = {
  showWaterfall: true
};

export default NetworkTableHeader;
