import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdCheck, MdClose } from '../Icon';

import Switch from './index';

const defaultConfig = {
  title: 'Application/Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Switch from 'bifrost/Switch'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    isShortToggle: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: false
    },
    leftDescription: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    leftLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    leftSubLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightDescription: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightSubLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    }
  },
  controls: {}
};

const ControlledComponent = (args) => {
  const [data, setData] = useState(false);
  return (
    <Switch
      {...args}
      checked={data}
      onChange={(newValue) => setData(newValue)}
    />
  );
};

const WithLabelDesc = (args) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between">
        <div className="flex grow flex-col">
          <span className="text-base-900 text-sm font-medium">
            Available to hire
          </span>
          <span className="text-base-500 text-sm">
            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
          </span>
        </div>
        <Switch
          {...args}
          checked={enabled}
          onChange={(newValue) => setEnabled(newValue)}
        />
      </div>
    </div>
  );
};

const WithRightLabel = (args) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-start">
      <Switch
        {...args}
        checked={enabled}
        onChange={(newValue) => setEnabled(newValue)}
      />
      <div className="ml-3">
        <span className="text-base-900 text-sm font-medium">
          Annual billing&nbsp;
        </span>
        <span className="text-base-500 text-sm">(Save 10%)</span>
      </div>
    </div>
  );
};

const ToggleWithIcons = (args) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      {...args}
      checked={enabled}
      onChange={(newValue) => setEnabled(newValue)}
      toggleIcons={(checked) => (
        <>
          <span
            className={twClassNames(
              checked
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <MdClose className="h-3 w-3" />
          </span>
          <span
            className={twClassNames(
              checked
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <MdCheck className="h-3 w-3" />
          </span>
        </>
      )}
    />
  );
};

const UncontrolledTemplate = (args) => <Switch {...args} defaultValue />;
const Uncontrolled = UncontrolledTemplate.bind({});
Uncontrolled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('switch')).toBeVisible();
  await userEvent.click(canvas.getByRole('switch'));
  await userEvent.click(canvas.getByRole('switch'));
};

Uncontrolled.parameters = {
  controls: {}
};

const ControlledTemplate = (args) => <ControlledComponent {...args} />;
const Controlled = ControlledTemplate.bind({});
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('switch')).toBeVisible();
  await userEvent.click(canvas.getByRole('switch'));
  await userEvent.click(canvas.getByRole('switch'));
};

Uncontrolled.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  Controlled,
  ToggleWithIcons,
  Uncontrolled,
  WithLabelDesc,
  WithRightLabel
};
