import React from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=132-34713&t=TWCLo3KWhysdxj9F-0'
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
  const canvas = within(canvasElement);
  expect(
    canvas.getByRole('button', {
      expanded: false
    })
  ).toBeInTheDocument();
  const arr = ['Account Settings', 'Support', 'License'];
  document.querySelectorAll('button')[3].click();
  await delay(1);
  expect(
    canvas.getByRole('button', {
      Name: 'Options',
      expanded: true
    })
  ).toBeInTheDocument();
  await delay(1);
  const buttons = document.querySelectorAll('button');
  await delay(1);
  buttons.forEach(async (item) => {
    if (Array.prototype.indexOf.call(buttons, item) > 3) {
      await expect(arr.includes(item.firstChild.nodeValue)).toBe(true);
    }
  });
  document.querySelectorAll('button')[3].click();
  await delay(1);
  expect(
    canvas.getByRole('button', {
      expanded: false
    })
  ).toBeInTheDocument();
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
