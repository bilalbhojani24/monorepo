/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { BadgeComboBox, ComboboxAddNewItem } from '@browserstack/bifrost';

const TMBadgeComboBox = (props) => (
  <BadgeComboBox
    addNewItemComponent={
      <ComboboxAddNewItem suffix="as a new option (↵)" showQuery prefix="Add" />
    }
    {...props}
  />
);

TMBadgeComboBox.propTypes = {};

TMBadgeComboBox.defaultProps = {};
export default TMBadgeComboBox;
