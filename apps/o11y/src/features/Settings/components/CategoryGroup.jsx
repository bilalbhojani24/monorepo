import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisVerticalIcon } from '@browserstack/bifrost';
import {
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { FAILURE_CATEGORIES_INFO } from '../constants';
import { getFailureSubCategoryByType } from '../slices/selectors';

function CategoryGroup({ type }) {
  const dispatch = useDispatch();
  const subcategories = useSelector(getFailureSubCategoryByType(type));

  const handleClickMeatBall = (value, subcategory) => {
    // eslint-disable-next-line no-console
    console.log(
      'dispatch, value, subcategory :>> ',
      dispatch,
      value,
      subcategory
    );
    // switch (value.id) {
    //   case 'edit':
    //     dispatch(
    //       toggleModal({
    //         version: MODAL_TYPES.add_edit_alert,
    //         data: {
    //           action: 'edit',
    //           alertData: alert
    //         }
    //       })
    //     );
    //     break;
    //   case 'delete':
    //     dispatch(
    //       toggleModal({
    //         version: MODAL_TYPES.delete_alert,
    //         data: {
    //           alertId: alert.id,
    //           alertType: alert.alertType
    //         }
    //       })
    //     );
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <>
      <O11yTableRow>
        <O11yTableCell
          variant="header"
          colspan={4}
          wrapperClassName="bg-base-50"
        >
          {FAILURE_CATEGORIES_INFO[type].label}
        </O11yTableCell>
      </O11yTableRow>
      {subcategories.map((subcategory) => (
        <O11yTableRow key={subcategory.id}>
          <O11yTableCell wrapperClassName="font-medium text-base-900 break-words whitespace-normal max-w-xs">
            {subcategory.name}
          </O11yTableCell>
          <O11yTableCell>
            <div className="flex justify-end">
              <O11yDropdown
                onClick={(value) => handleClickMeatBall(value, subcategory)}
              >
                <div className="flex">
                  <O11yDropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </O11yDropdownTrigger>
                </div>

                <O11yDropdownOptionGroup wrapperClassName="w-32">
                  <O11yDropdownOptionItem
                    option={{ body: 'Edit', id: 'edit' }}
                  />
                  <O11yDropdownOptionItem
                    option={{ body: 'Delete', id: 'delete' }}
                    wrapperClassName="text-danger-600"
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

CategoryGroup.propTypes = {
  type: PropTypes.string.isRequired
};

export default CategoryGroup;
