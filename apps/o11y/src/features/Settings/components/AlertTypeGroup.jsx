import React from 'react';
import { useSelector } from 'react-redux';
import { EllipsisVerticalIcon } from '@browserstack/bifrost';
import {
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import {
  ALERT_CONDITION_MAP,
  ALERT_LEVELS,
  ALERT_TYPES_INFO
} from '../constants';
import { getAlertDataByType } from '../slices/selectors';

export default function AlertTypeGroup({ type }) {
  const alerts = useSelector(getAlertDataByType(type));

  if (isEmpty(alerts)) {
    return null;
  }

  return (
    <>
      <O11yTableRow>
        <O11yTableCell
          variant="header"
          colspan={4}
          wrapperClassName="bg-base-50"
        >
          {ALERT_TYPES_INFO[type].label}
        </O11yTableCell>
      </O11yTableRow>
      {alerts.map((alert) => (
        <O11yTableRow key={alert.id}>
          <O11yTableCell wrapperClassName="font-medium text-base-900 break-words whitespace-normal max-w-xs">
            {alert.name}
          </O11yTableCell>
          <O11yTableCell>
            <p className="flex gap-1">
              <span>
                {
                  ALERT_CONDITION_MAP?.[
                    alert?.alertRules?.[ALERT_LEVELS.WARNING]?.condition
                  ].tableText
                }
              </span>
              <span>
                {alert?.alertRules?.[ALERT_LEVELS.WARNING]?.value}
                {ALERT_TYPES_INFO[type].suffix}
              </span>
            </p>
          </O11yTableCell>
          <O11yTableCell>
            <p className="flex gap-1">
              <span>
                {
                  ALERT_CONDITION_MAP?.[
                    alert?.alertRules?.[ALERT_LEVELS.CRITICAL]?.condition
                  ].tableText
                }
              </span>
              <span>
                {alert?.alertRules?.[ALERT_LEVELS.CRITICAL]?.value}
                {ALERT_TYPES_INFO[type].suffix}
              </span>
            </p>
          </O11yTableCell>
          <O11yTableCell>
            <div className="flex justify-between">
              {alert?.buildName?.length
                ? `${alert.buildName.length} builds`
                : 'All builds'}

              <O11yDropdown
              // onClick={(value) => {
              //   console.log(value);
              // }}
              >
                <div className="flex">
                  <O11yDropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </O11yDropdownTrigger>
                </div>

                <O11yDropdownOptionGroup>
                  <O11yDropdownOptionItem
                    option={{ body: 'Edit Alert', id: 'edit' }}
                  />
                </O11yDropdownOptionGroup>
              </O11yDropdown>
            </div>
          </O11yTableCell>
        </O11yTableRow>
      ))}
    </>
  );
}

AlertTypeGroup.propTypes = {
  type: PropTypes.string.isRequired
};
