import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import RadioCard from '../RadioCardItem';
import Radio from '../RadioItem';
import RadioTable from '../RadioTableItem';

import {
  dummySmallCardData,
  dummyStackedCardData
} from './const/radioCardConstants';
import { DIRECTIONS, dummyData } from './const/radioItemConstants';
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
            <Radio
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
    required: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    error: {
      option: { type: 'string' },
      defaultValue: ''
    },
    value: {
      option: { type: 'string' },
      defaultValue: null
    },
    defaultValue: {
      option: { type: 'string' },
      defaultValue: null
    },
    label: {
      options: { type: 'string' },
      defaultValue: ''
    },
    id: {
      type: { summary: 'STRING', required: false },
      description:
        'The ID of the radio group element to uniquely identify every group.',
      control: { type: 'text' },
      defaultValue: ''
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Provide additional styles to outer component',
      control: { type: 'text' },
      defaultValue: ''
    },
    columnWrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Custom style for RadioItems wrapper',
      control: { type: 'text' },
      defaultValue: ''
    },
    type: {
      options: ['default', 'smallCard', 'stackedCard', 'table'],
      control: { type: 'inline-radio' },
      defaultValue: 'default'
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
  required: true,
  defaultValue: dummyData[1].value,
  error: 'Select one option'
};

export { Primary };

export const ControlledRightalignedRadioGroup = (args) => {
  const [selected, setSelected] = useState(dummyData[0].value);
  return (
    <RadioGroup {...args} value={selected} onChange={setSelected}>
      {dummyData.map((option) => (
        <Radio
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
  type: 'smallCard',
  defaultValue: dummySmallCardData[0].value,
  children: (
    <>
      {dummySmallCardData.map((option) => (
        <RadioCard
          key={option.value}
          option={option}
          disabled={option.disabled}
        />
      ))}
    </>
  )
};

export { RadioSmallCards };

const RadioStackedCards = Template.bind({});

RadioStackedCards.parameters = {
  controls: {}
};

RadioStackedCards.args = {
  type: 'stackedCard',
  defaultValue: dummyStackedCardData[0].value,
  children: (
    <>
      {dummyStackedCardData.map((option) => (
        <RadioCard
          key={option.value}
          type="stackedCard"
          option={option}
          disabled={option.disabled}
        />
      ))}
    </>
  )
};

export { RadioStackedCards };

export const ControlledVerticalRadioStackedCards = (args) => {
  const [selected, setSelected] = useState(dummyStackedCardData[0].value);
  return (
    <RadioGroup
      {...args}
      type="stackedCard"
      direction="vertical"
      value={selected}
      onChange={setSelected}
    >
      {dummyStackedCardData.map((option) => (
        <RadioCard
          key={option.value}
          type="stackedCard"
          option={option}
          direction="vertical"
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
  type: 'table',
  defaultValue: tableDummyData[0].value,
  children: (
    <>
      {tableDummyData.map((option, i) => (
        <RadioTable
          key={option.value}
          type="table"
          index={i}
          length={tableDummyData.length}
          option={option}
          disabled={option.disabled}
        />
      ))}
    </>
  )
};

export { RadioTables };

const RadioSingleColumnTable = Template.bind({});

RadioSingleColumnTable.parameters = {
  controls: {}
};

RadioSingleColumnTable.args = {
  type: 'table',
  defaultValue: tableDummyData[1].value,
  children: (
    <>
      {tableDummyData.map((option, i) => (
        <RadioTable
          key={option.value}
          type="table"
          index={i}
          length={tableDummyData.length}
          option={option}
          disabled={option.disabled}
          singleColumn
          inlineDescription={false}
        />
      ))}
    </>
  )
};

export { RadioSingleColumnTable };

export default defaultConfig;
