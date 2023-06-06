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
      defaultValue: DIRECTIONS[1]
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

const SimpleListArgs = {
  label: 'Simple List',
  description: 'How do you prefer to receive list?',
  isMandatory: true,
  defaultValue: dummyData[1].value,
  errorText: 'Select any one option',
  type: 'default',
  columnWrapperClassName: 'space-y-5 mb-3'
};

export const SimpleList = (args) => (
  <RadioGroup {...args} {...SimpleListArgs} />
);

const SimpleInlineListArgs = {
  label: 'Simple Inline List',
  isMandatory: true,
  defaultValue: dummyData[1].value,
  direction: 'inline',
  type: 'default'
};

export const SimpleInlineList = (args) => (
  <RadioGroup {...args} {...SimpleInlineListArgs} />
);

const ListWithDescriptionArgs = {
  defaultValue: dummyData[1].value,
  children: (
    <>
      {dummyData.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          disabled={option.disabled}
          withDescription
        />
      ))}
    </>
  ),
  columnWrapperClassName: 'space-y-5',
  type: 'default'
};

export const ListWithDescription = (args) => (
  <RadioGroup {...args} {...ListWithDescriptionArgs} />
);

const ListWithInlineDescriptionArgs = {
  defaultValue: dummyData[1].value,
  children: (
    <>
      {dummyData.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          disabled={option.disabled}
          withDescription
          inlineDescription
        />
      ))}
    </>
  ),
  type: 'default',
  columnWrapperClassName: 'space-y-5'
};
export const ListWithInlineDescription = (args) => (
  <RadioGroup {...args} {...ListWithInlineDescriptionArgs} />
);

export const ControlledSimpleListWithRadioOnRight = (args) => {
  const [selected, setSelected] = useState(dummyData[0].value);
  return (
    <RadioGroup
      {...args}
      type="default"
      value={selected}
      onChange={setSelected}
      columnWrapperClassName="border-t border-b border-base-200 divide-y divide-base-200"
    >
      {dummyData.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          disabled={option.disabled}
          rightAligned
          wrapperClassName="py-4"
        />
      ))}
    </RadioGroup>
  );
};

const ListWithRadioOnRightArgs = {
  defaultValue: dummyData[1].value,
  columnWrapperClassName:
    'border-t border-b border-base-200 divide-y divide-base-200',
  children: (
    <>
      {dummyData.map((option) => (
        <RadioItem
          key={option.value}
          option={option}
          disabled={option.disabled}
          withDescription
          inlineDescription
          rightAligned
          wrapperClassName="py-4"
        />
      ))}
    </>
  ),
  type: 'default'
};

export const ListWithRadioOnRight = (args) => (
  <RadioGroup {...args} {...ListWithRadioOnRightArgs} />
);

const SmallCardsArgs = {
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

export const SmallCards = (args) => (
  <RadioGroup {...args} {...SmallCardsArgs} />
);

const StackedCardsArgs = {
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

export const StackedCards = (args) => (
  <RadioGroup {...args} {...StackedCardsArgs} />
);

export const InlineCards = (args) => {
  const [selected, setSelected] = useState(dummyStackedCardData[0].value);
  return (
    <RadioGroup
      {...args}
      type={TYPES[2]}
      direction={DIRECTIONS[0]}
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

const SimpleTableArgs = {
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

export const SimpleTable = (args) => (
  <RadioGroup {...args} {...SimpleTableArgs} />
);

const ListWithDescriptionInPanelArgs = {
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

export const ListWithDescriptionInPanel = (args) => (
  <RadioGroup {...args} {...ListWithDescriptionInPanelArgs} />
);

export default defaultConfig;
