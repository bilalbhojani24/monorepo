import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SidebarHeader from './index';

const selectOptions = [
  { label: 'Project 1', value: 'p1' },
  { label: 'Project 2', value: 'p2' },
  { label: 'Project 3', value: 'p3' },
];

const defaultConfig = {
  title: 'Application/Components/SidebarHeader',
  component: SidebarHeader,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import { SidebarHeader } from '@browserstack/bifrost'"
          }
        />
      ),
    },
  },
  argTypes: {
    brandImage: {
      option: { type: 'string' },
      defaultValue: 'https://tailwindui.com/img/logos/mark.svg',
    },
    brandImageClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    brandImageContainerClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    dropdownOptions: {
      option: { type: null },
      defaultValue: selectOptions,
    },
    dropdownValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled externally',
      defaultValue: selectOptions[0],
    },
    dropdownDefaultValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: null,
    },
    onDropdownValueChange: {
      option: { type: null },
      defaultValue: () => {},
    },
  },
  controls: {},
};
// eslint-disable-next-line react/jsx-props-no-spreading
const Template = (args) => <SidebarHeader {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
