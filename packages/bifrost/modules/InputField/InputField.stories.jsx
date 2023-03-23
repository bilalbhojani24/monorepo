import React from 'react';
import {
  BarsArrowUpIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  UserIcon
} from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
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
      //   control: { type: null },
      defaultValue: null
      // defaultValue: <EnvelopeIcon className="text-base-400 h-5 w-5" />
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
    placeholder: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Placeholder text'
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
const InputWithLeadingIconAndTrailingButton =
  InputWithLeadingIconAndTrailingButtonTemplate.bind({});
const InputWithLabelAndHelpText = InputWithLabelAndHelpTextTemplate.bind({});
const InputWithValidationError = InputWithValidationErrorTemplate.bind({});
const InputWithDisabledState = InputWithDisabledStateTemplate.bind({});
const InputWithHiddenLabel = InputWithHiddenLabelTemplate.bind({});
const InputWithCornerHint = InputWithCornerHintTemplate.bind({});
const InputWithLeadingIcon = InputWithLeadingIconTemplate.bind({});
const InputWithTrailingIcon = InputWithTrailingIconTemplate.bind({});
const InputWithAddOn = InputWithAddOnTemplate.bind({});
const InputWithAddOnInline = InputWithAddOnInlineTemplate.bind({});
const InputWithInlineTrailingLeading =
  InputWithInlineTrailingLeadingTemplate.bind({});
const InputWithInlineLeadingDropdown =
  InputWithInlineLeadingDropdownTemplate.bind({});
const InputWithInlineLeadingAddOnAndTrailingDropdown =
  InputWithInlineLeadingAddOnAndTrailingDropdownTemplate.bind({});
const InputWithTooltip = InputWithTooltipTemplate.bind({});
const InputWithTrailingClickable = InputWithTrailingClickableTemplate.bind({});

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
  value: 'adamwathan'
};

InputWithDisabledState.args = {
  label: 'Email',
  value: emailText,
  disabled: true
};

InputWithHiddenLabel.args = {
  label: null,
  value: emailText
};

InputWithCornerHint.args = {
  label: 'Email',
  value: emailText,
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
  label: 'Account number',
  placeholder: '000-00-0000',
  addOnAfterInline: <QuestionMarkCircleIcon className="text-base-400 h-5 w-5" />
};

InputWithAddOn.args = {
  addOnAfter: <InputGroupAddOn position="end">.com</InputGroupAddOn>,
  addOnBefore: <InputGroupAddOn>https://</InputGroupAddOn>
};

InputWithAddOnInline.args = {
  label: 'Company Website',
  placeholder: 'www.example.com',
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
  leadingIconWrapperClassName: 'pl-0',
  addOnBeforeInline: (
    <SelectMenu>
      <InputGroupSelectMenuTrigger />
      <SelectMenuOptionGroup alignment="start">
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  ),
  isTrailingNodeClickable: true
};

InputWithInlineLeadingAddOnAndTrailingDropdown.args = {
  label: 'Price',
  type: 'number',
  placeholder: '0.00',
  addOnBeforeInline: <InputGroupAddOn inline>$</InputGroupAddOn>,
  trailingIconWrapperClassName: 'pr-0',
  addOnAfterInline: (
    <SelectMenu>
      <InputGroupSelectMenuTrigger />
      <SelectMenuOptionGroup alignment="end">
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  ),
  isTrailingNodeClickable: true
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
  label: 'Account number',
  placeholder: '000-00-0000',
  addOnAfterInline: (
    <InputGroupAddOn inline>
      <Tooltip
        theme="dark"
        content={<TooltipBody>I am tooltip body</TooltipBody>}
      >
        <QuestionMarkCircleIcon className="h-5 w-5" />
      </Tooltip>
    </InputGroupAddOn>
  ),
  isTrailingNodeClickable: true
};

InputWithTrailingClickable.args = {
  label: 'Account holder',
  placeholder: 'Devon Mccoy',
  addOnAfterInline: (
    <Button variant="minimal" onClick={() => console.log('I am clicked')}>
      <QuestionMarkCircleIcon className="text-base-500 h-5 w-5" />
    </Button>
  ),
  isTrailingNodeClickable: true
};
