import React from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import {
  BarsArrowUpIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  UserIcon
} from '../Icon';
import SelectMenu from '../SelectMenu';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import Tooltip from '../Tooltip';
import TooltipBody from '../TooltipBody';

import InputGroupAddOn from './components/InputGroupAddOn';
import InputGroupButton from './components/InputGroupButton';
import InputGroupSelectMenuTrigger from './components/InputGroupSelectMenuTrigger';
import InputField from './index';

const emailText = 'you@example.com';
const automatedText = `AUTOMATED TEST GENERATED TEXT`;
const automatedNumer = `1234567890`;
const placeholderEmail = emailText;
const labelText = 'Label';
const labelEmail = 'Email';
const helpText = "We'll only use this for spam.";
const cornerHintText = 'Optional';
const validationErrorText = 'Not a valid email address.';
const addonText = 'https://';
const dropdownOptions = ['USA', 'CA', 'EU'];
const placeholderText = 'Placeholder text';

const defaultConfig = {
  title: 'Application/Components/InputField',
  component: InputField,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import InputField from 'bifrost/InputField'"}
        />
      )
    }
  },
  argTypes: {
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Content that goes inside the banner',
      control: { type: 'text' },
      defaultValue: 'Label'
    },
    autoComplete: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'off'
    },
    cornerHintText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    defaultValue: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: undefined
    },
    value: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: undefined
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    errorText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    id: {
      type: { summary: 'STRING', required: true },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'test-id'
    },
    inputRef: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null }
    },
    addOnBeforeInline: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: null
    },
    addOnAfterInline: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      defaultValue: null
    },
    addOnBefore: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: null
    },
    addOnAfter: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: null
    },
    addOnAfterInlineWrapperClassName: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: ''
    },
    addOnBeforeInlineWrapperClassName: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: ''
    },
    placeholder: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: placeholderText
    },
    readonly: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'boolean' },
      defaultValue: false
    },
    type: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'text'
    }
  },
  controls: {}
};
const Template = (args) => <InputField {...args} />;
const InputWithLeadingIconAndTrailingButtonTemplate = (args) => (
  <InputField {...args} />
);
const InputWithLabelAndHelpTextTemplate = (args) => <InputField {...args} />;
const InputWithValidationErrorTemplate = (args) => <InputField {...args} />;
const InputWithDisabledStateTemplate = (args) => <InputField {...args} />;
const InputWithHiddenLabelTemplate = (args) => <InputField {...args} />;
const InputWithCornerHintTemplate = (args) => <InputField {...args} />;
const InputWithLeadingIconTemplate = (args) => <InputField {...args} />;
const InputWithTrailingIconTemplate = (args) => <InputField {...args} />;
const InputWithAddOnTemplate = (args) => <InputField {...args} />;
const InputWithAddOnInlineTemplate = (args) => <InputField {...args} />;
const InputWithInlineTrailingLeadingTemplate = (args) => (
  <InputField {...args} />
);
const InputWithInlineLeadingDropdownTemplate = (args) => (
  <InputField {...args} />
);
const InputWithInlineLeadingAddOnAndTrailingDropdownTemplate = (args) => (
  <InputField {...args} />
);
const InputWithTooltipTemplate = (args) => <InputField {...args} />;
const InputWithTrailingClickableTemplate = (args) => <InputField {...args} />;

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
};
const InputWithLeadingIconAndTrailingButton =
  InputWithLeadingIconAndTrailingButtonTemplate.bind({});
InputWithLeadingIconAndTrailingButton.play = async ({ canvasElement }) => {
  const InputWithLeadingIconAndTrailingButtonPlaceholder = '0.00';
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Price')).toBeVisible();
  await expect(
    canvas.getByPlaceholderText(
      InputWithLeadingIconAndTrailingButtonPlaceholder
    )
  ).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(
      InputWithLeadingIconAndTrailingButtonPlaceholder
    ),
    automatedNumer
  );
  await userEvent.click(canvas.getByRole('button'));
};

const InputWithLabelAndHelpText = InputWithLabelAndHelpTextTemplate.bind({});
InputWithLabelAndHelpText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelEmail)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderEmail)).toBeVisible();
  await expect(canvas.getByText(helpText)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderEmail),
    automatedText
  );
};

const InputWithValidationError = InputWithValidationErrorTemplate.bind({});
InputWithValidationError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelEmail)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await userEvent.clear(canvas.getByPlaceholderText(placeholderText));
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
  await expect(canvas.getByText(validationErrorText)).toBeVisible();
};

const InputWithDisabledState = InputWithDisabledStateTemplate.bind({});
InputWithDisabledState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelEmail)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await userEvent.clear(canvas.getByPlaceholderText(placeholderText));
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
};

const InputWithHiddenLabel = InputWithHiddenLabelTemplate.bind({});
InputWithHiddenLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.queryAllByText(labelText).length).toBe(0);
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await userEvent.clear(canvas.getByPlaceholderText(placeholderText));
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
};

const InputWithCornerHint = InputWithCornerHintTemplate.bind({});
InputWithCornerHint.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelEmail)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await expect(canvas.getByText(cornerHintText)).toBeVisible();
  await userEvent.clear(canvas.getByPlaceholderText(placeholderText));
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
};

const InputWithLeadingIcon = InputWithLeadingIconTemplate.bind({});
InputWithLeadingIcon.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelEmail)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderEmail)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderEmail),
    automatedText
  );
};

const InputWithTrailingIcon = InputWithTrailingIconTemplate.bind({});
InputWithTrailingIcon.play = async ({ canvasElement }) => {
  const trailingPlaceholder = '000-00-000';
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(canvas.getByPlaceholderText(trailingPlaceholder)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(trailingPlaceholder),
    automatedText
  );
};

const InputWithAddOn = InputWithAddOnTemplate.bind({});
InputWithAddOn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await expect(canvas.getByText(addonText)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
  await expect(canvas.getByText('.com')).toBeVisible();
};

const InputWithAddOnInline = InputWithAddOnInlineTemplate.bind({});
InputWithAddOnInline.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderEmail)).toBeVisible();
  await expect(canvas.getByText(addonText)).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderEmail),
    automatedText
  );
};

const InputWithInlineTrailingLeading =
  InputWithInlineTrailingLeadingTemplate.bind({});
InputWithInlineTrailingLeading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Price')).toBeVisible();
  await expect(canvas.getByPlaceholderText('0.00')).toBeVisible();
  await expect(canvas.getByText('$')).toBeVisible();
  await expect(canvas.getByText('USD')).toBeVisible();
  await userEvent.type(canvas.getByPlaceholderText('0.00'), '1.11');
};

const InputWithInlineLeadingDropdown =
  InputWithInlineLeadingDropdownTemplate.bind({});
InputWithInlineLeadingDropdown.play = async ({ canvasElement }) => {
  const InputWithInlineLeadingDropdownPlaceholder = '+1 (555) 987-6543';
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Phone Number')).toBeVisible();
  await expect(
    canvas.getByPlaceholderText(InputWithInlineLeadingDropdownPlaceholder)
  ).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(InputWithInlineLeadingDropdownPlaceholder),
    automatedNumer
  );
  await userEvent.click(canvas.getByRole('button'));
  await delay(1);
  const elements = document.querySelectorAll('[role="option"]');
  elements.forEach(async (option) => {
    await expect(dropdownOptions.includes(option.firstChild.textContent)).toBe(
      true
    );
  });
  await delay(1);
  elements[0].click();
  await delay(1);
  await expect(canvas.getByText(dropdownOptions[0])).toBeVisible();
};

const InputWithInlineLeadingAddOnAndTrailingDropdown =
  InputWithInlineLeadingAddOnAndTrailingDropdownTemplate.bind({});
InputWithInlineLeadingAddOnAndTrailingDropdown.play = async ({
  canvasElement
}) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Price')).toBeVisible();
  await expect(canvas.getByPlaceholderText('0.00')).toBeVisible();
  await userEvent.type(canvas.getByPlaceholderText('0.00'), automatedNumer);
  await expect(canvas.getByText('$')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
  await delay(1);
  const elements = document.querySelectorAll('[role="option"]');
  elements.forEach(async (option) => {
    await expect(dropdownOptions.includes(option.firstChild.textContent)).toBe(
      true
    );
  });
  await delay(1);
  elements[0].click();
  await delay(1);
  await expect(canvas.getByText(dropdownOptions[0])).toBeVisible();
};

const InputWithTooltip = InputWithTooltipTemplate.bind({});
InputWithTooltip.play = async ({ canvasElement }) => {
  const InputWithTooltipPlaceholder = '000-00';
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(
    canvas.getByPlaceholderText(InputWithTooltipPlaceholder)
  ).toBeVisible();
  await userEvent.type(
    canvas.getByPlaceholderText(InputWithTooltipPlaceholder),
    automatedText
  );
  await userEvent.hover(canvas.getByRole('button'));
};

const InputWithTrailingClickable = InputWithTrailingClickableTemplate.bind({});
InputWithTrailingClickable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(labelText)).toBeVisible();
  await expect(canvas.getByPlaceholderText(placeholderText)).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
  await userEvent.type(
    canvas.getByPlaceholderText(placeholderText),
    automatedText
  );
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  InputWithAddOn,
  InputWithAddOnInline,
  InputWithCornerHint,
  InputWithDisabledState,
  InputWithHiddenLabel,
  InputWithInlineLeadingAddOnAndTrailingDropdown,
  InputWithInlineLeadingDropdown,
  InputWithInlineTrailingLeading,
  InputWithLabelAndHelpText,
  InputWithLeadingIcon,
  InputWithLeadingIconAndTrailingButton,
  InputWithTooltip,
  InputWithTrailingClickable,
  InputWithTrailingIcon,
  InputWithValidationError,
  Primary
};

InputWithLabelAndHelpText.args = {
  description: "We'll only use this for spam.",
  placeholder: emailText,
  label: 'Email'
};

InputWithValidationError.args = {
  errorText: 'Not a valid email address.',
  label: 'Email',
  defaultValue: 'adamwathan'
};

InputWithDisabledState.args = {
  label: 'Email',
  value: emailText,
  disabled: true
};

InputWithHiddenLabel.args = {
  label: null,
  defaultValue: emailText
};

InputWithCornerHint.args = {
  label: 'Email',
  defaultValue: emailText,
  cornerHintText: 'Optional'
};

InputWithLeadingIcon.args = {
  label: 'Email',
  placeholder: emailText,
  addOnBeforeInline: (
    <InputGroupAddOn inline>
      <EnvelopeIcon className="h-5 w-5" />
    </InputGroupAddOn>
  )
};

InputWithTrailingIcon.args = {
  label: 'Label',
  placeholder: '000-00-000',
  addOnAfterInline: <QuestionMarkCircleIcon className="text-base-400 h-5 w-5" />
};

InputWithAddOn.args = {
  addOnAfter: <InputGroupAddOn position="end">.com</InputGroupAddOn>,
  addOnBefore: <InputGroupAddOn>https://</InputGroupAddOn>
};

InputWithAddOnInline.args = {
  label: 'Label',
  placeholder: 'you@example.com',
  addOnBeforeInline: <InputGroupAddOn inline>https://</InputGroupAddOn>
};

InputWithInlineTrailingLeading.args = {
  label: 'Price',
  type: 'number',
  placeholder: '0.00',
  addOnBeforeInline: <InputGroupAddOn inline>$</InputGroupAddOn>,
  addOnAfterInline: (
    <InputGroupAddOn inline position="end">
      USD
    </InputGroupAddOn>
  )
};

const options = [
  {
    label: 'USA',
    value: 1
  },
  {
    value: 2,
    label: 'CA'
  },
  {
    value: 3,
    label: 'EU'
  }
];

InputWithInlineLeadingDropdown.args = {
  type: 'number',
  label: 'Phone Number',
  placeholder: '+1 (555) 987-6543',
  addOnBeforeInlineWrapperClassName: 'pl-0',
  addOnBeforeInline: (
    <SelectMenu>
      <InputGroupSelectMenuTrigger />
      <SelectMenuOptionGroup alignment="start">
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  )
};

InputWithInlineLeadingAddOnAndTrailingDropdown.args = {
  label: 'Price',
  type: 'number',
  placeholder: '0.00',
  addOnBeforeInline: <InputGroupAddOn inline>$</InputGroupAddOn>,
  addOnAfterInlineWrapperClassName: 'pr-0',
  addOnAfterInline: (
    <SelectMenu>
      <InputGroupSelectMenuTrigger />
      <SelectMenuOptionGroup alignment="end">
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  )
};

InputWithLeadingIconAndTrailingButton.args = {
  label: 'Price',
  type: 'number',
  placeholder: '0.00',
  addOnBeforeInline: (
    <InputGroupAddOn inline>
      <UserIcon className="h-5 w-5" />
    </InputGroupAddOn>
  ),
  addOnAfter: (
    <InputGroupButton position="end">
      <span>Sort</span>
      <BarsArrowUpIcon className="h-5 w-5" aria-hidden="true" />
    </InputGroupButton>
  )
};

InputWithTooltip.args = {
  label: 'Label',
  placeholder: '000-00',
  addOnAfterInline: (
    <InputGroupAddOn inline>
      <Tooltip
        theme="dark"
        content={<TooltipBody>I am tooltip body</TooltipBody>}
      >
        <Button
          variant="minimal"
          wrapperClassName="rounded-l-none border border-base-300"
        >
          <span className="text-base-500 flex space-x-1.5 px-3">
            <BarsArrowUpIcon
              className="text-base-500 h-5 w-5"
              aria-hidden="true"
            />
            <span>ToolTip</span>
          </span>
        </Button>
      </Tooltip>
    </InputGroupAddOn>
  )
};

InputWithTrailingClickable.args = {
  label: 'Label',
  placeholder: placeholderText,
  addOnAfterInline: (
    <Button
      variant="minimal"
      onClick={() => console.log('I am clicked')}
      ariaLabel="button variant"
    >
      <QuestionMarkCircleIcon className="text-base-500 h-5 w-5" />
    </Button>
  )
};
