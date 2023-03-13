import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import { ChevronDownIcon, EllipsisVerticalIcon } from '../Icon';

import Dropdown from './index';

const options = [
  { body: 'Account Settings', id: 1 },
  { body: 'Support', id: 2 },
  { body: 'License', id: 3 }
];

const defaultConfig = {
  title: 'Application/Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Dropdown from 'bifrost/Dropdown'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      controles: { type: null },
      defaultValue: (
        <>
          <div className="flex">
            <DropdownTrigger>
              Options
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {options.map((opt) => (
              <DropdownOptionItem key={opt.value} option={opt} />
            ))}
          </DropdownOptionGroup>
        </>
      )
    },
    onClick: {
      controls: { type: null }
    },
    onOpenChange: {
      controls: { type: null },
      defaultValue: (openStatus) => {
        console.log(openStatus);
      }
    },
    wrapperClassName: {
      controles: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};

const Template = (args) => <Dropdown {...args} />;

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const canvas = within(canvasElement);
  expect(
    canvas.getByRole('button', {
      expanded: false
    })
  ).toBeInTheDocument();
  const arr = ['Account Settings', 'Support', 'License'];
  document.querySelectorAll('button')[3].click();
  await sleep(1);
  const buttons = document.querySelectorAll('button');
  for (let i = 4; i < buttons.length; i += 1) {
    expect(arr.includes(buttons[i].firstChild.nodeValue)).toBe(true);
  }
};
Primary.parameters = {
  controls: {}
};

export const MeatballDropdown = () => (
  <Dropdown
    onClick={(value) => {
      console.log(value);
    }}
  >
    <div className="flex">
      <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </DropdownTrigger>
    </div>

    <DropdownOptionGroup>
      {options.map((opt) => (
        <DropdownOptionItem key={opt.value} option={opt} />
      ))}
    </DropdownOptionGroup>
  </Dropdown>
);

export default defaultConfig;
export { Primary };
