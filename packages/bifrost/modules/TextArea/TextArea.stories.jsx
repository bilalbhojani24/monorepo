import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TextArea from './index';

const defaultConfig = {
  title: 'Application/Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TextArea from 'bifrost/TextArea'"}
        />
      )
    }
  },
  argTypes: {
    id: {
      option: { type: 'string' },
      defaultValue: 'Add your comment'
    },
    defaultValue: {
      option: { type: 'string' },
      defaultValue: undefined
    },
    disabled: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Add your comment'
    },
    name: {
      option: { type: 'string' },
      defaultValue: 'textarea'
    },
    onChange: {
      option: { type: 'null' },
      defaultValue: (e) => {
        // eslint-disable-next-line no-console
        console.log(e.target.value);
      }
    },
    rows: {
      option: { type: 'number' },
      defaultValue: 3
    },
    value: {
      option: { type: 'string' },
      defaultValue: 'I am value'
    }
  },
  controls: {}
};
const Template = (args) => <TextArea {...args} />;
const UncontrolledTextareaTemplate = (args) => <TextArea {...args} />;
const Primary = Template.bind({});
const UncontrolledTextarea = UncontrolledTextareaTemplate.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, UncontrolledTextarea };

UncontrolledTextarea.args = {
  value: undefined,
  defaultValue: 'I am default value'
};
