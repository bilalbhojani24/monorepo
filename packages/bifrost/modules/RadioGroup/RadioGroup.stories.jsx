import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import RadioCardItem from '../RadioCardItem';
import RadioItem from '../RadioItem';
import RadioTableItem from '../RadioTableItem';

import {
  dummySmallCardData,
  dummyStackedCardData
} from './const/radioCardConstants';
import { DIRECTIONS, dummyData, TYPES } from './const/radioItemConstants';
import { tableDummyData } from './const/radioTableConstants';
import RadioGroup from './index';

const defaultConfig = {
  title: 'Application/Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import RadioGroup from 'bifrost/RadioGroup'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=122-34479&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    direction: {
      options: DIRECTIONS,
      control: { type: 'inline-radio' },
      defaultValue: DIRECTIONS[0]
    },
    children: {
      option: { type: 'string' },
      defaultValue: (
        <>
          {dummyData.map((option) => (
            <RadioItem
              key={option.value}
              option={option}
              disabled={option.disabled}
            />
          ))}
        </>
      )
    },
    onChange: {
      control: { type: 'text' },
      defaultValue: null
    },
    isMandatory: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    errorText: {
      option: { type: 'string' },
      defaultValue: ''
    },
    value: {
      option: { type: 'string' },
      defaultValue: undefined
    },
    defaultValue: {
      option: { type: 'string' },
      defaultValue: undefined
    },
    label: {
      options: { type: 'string' },
      defaultValue: ''
    },
    id: {
      type: { summary: 'STRING', isMandatory: true },
      description:
        'The ID of the radio group element to uniquely identify every group.',
      control: { type: 'text' },
      defaultValue: 'r1'
    },
    wrapperClassName: {
      type: { summary: 'STRING', isMandatory: false },
      description: 'Provide additional styles to outer component',
      control: { type: 'text' },
      defaultValue: ''
    },
    columnWrapperClassName: {
      type: { summary: 'STRING', isMandatory: false },
      description: 'Custom style for RadioItems wrapper',
      control: { type: 'text' },
      defaultValue: ''
    },
    type: {
      options: TYPES,
      control: { type: 'inline-radio' },
      defaultValue: TYPES[0]
    }
  },
  controls: {}
};

const Template = (args) => <RadioGroup {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {}
};

Primary.args = {
  label: 'Radio Groups',
  description: 'How do you prefer to receive radios?',
  isMandatory: true,
  defaultValue: dummyData[1].value,
  errorText: 'Select one option'
};

const ControlledRightalignedRadioGroup = (args) => {
  const [selected, setSelected] = useState(dummyData[0].value);
  return (
    <RadioGroup {...args} value={selected} onChange={setSelected}>
      {dummyData.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          disabled={option.disabled}
          rightAligned
        />
      ))}
    </RadioGroup>
  );
};

const RadioSmallCards = Template.bind({});

RadioSmallCards.parameters = {
  controls: {}
};

RadioSmallCards.args = {
  type: TYPES[1],
  defaultValue: dummySmallCardData[0].value,
  children: (
    <>
      {dummySmallCardData.map((option) => (
        <RadioCardItem
          key={option.value}
          option={option}
          disabled={option.disabled}
        />
      ))}
    </>
  )
};

const RadioStackedCards = Template.bind({});

RadioStackedCards.parameters = {
  controls: {}
};

RadioStackedCards.args = {
  type: TYPES[2],
  defaultValue: dummyStackedCardData[0].value,
  children: (
    <>
      {dummyStackedCardData.map((option) => (
        <RadioCardItem
          key={option.value}
          option={option}
          disabled={option.disabled}
        />
      ))}
    </>
  )
};

const ControlledVerticalRadioStackedCards = (args) => {
  const [selected, setSelected] = useState(dummyStackedCardData[0].value);
  return (
    <RadioGroup
      {...args}
      type={TYPES[2]}
      direction={DIRECTIONS[1]}
      value={selected}
      onChange={setSelected}
    >
      {dummyStackedCardData.map((option) => (
        <RadioCardItem
          key={option.value}
          option={option}
          disabled={option.disabled}
        />
      ))}
    </RadioGroup>
  );
};

const RadioTables = Template.bind({});

RadioTables.parameters = {
  controls: {}
};

RadioTables.args = {
  type: TYPES[3],
  defaultValue: tableDummyData[0].value,
  children: (
    <>
      {tableDummyData.map((option, i) => {
        let borderType = 'none';
        if (i === 0) borderType = 'topRounded';
        else if (i === tableDummyData.length - 1) borderType = 'bottomRounded';
        return (
          <RadioTableItem
            key={option.value}
            borderType={borderType}
            option={option}
            disabled={option.disabled}
          />
        );
      })}
    </>
  )
};

const RadioSingleColumnTable = Template.bind({});

RadioSingleColumnTable.parameters = {
  controls: {}
};

RadioSingleColumnTable.args = {
  type: TYPES[3],
  defaultValue: tableDummyData[1].value,
  children: (
    <>
      {tableDummyData.map((option, i) => {
        let borderType = 'none';
        if (i === 0) borderType = 'topRounded';
        else if (i === tableDummyData.length - 1) borderType = 'bottomRounded';
        return (
          <RadioTableItem
            key={option.value}
            borderType={borderType}
            option={option}
            disabled={option.disabled}
            singleColumn
            inlineDescription={false}
          />
        );
      })}
    </>
  )
};

export {
  ControlledRightalignedRadioGroup,
  ControlledVerticalRadioStackedCards,
  Primary,
  RadioSingleColumnTable,
  RadioSmallCards,
  RadioStackedCards,
  RadioTables
};

export default defaultConfig;
