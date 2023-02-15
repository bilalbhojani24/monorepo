import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import Draggable from './index';

const defaultConfig = {
  title: 'Application/Components/Draggable',
  component: Draggable,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Draggable from 'bifrost/Draggable'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <div className="absolute">
          <Button wrapperClassName="drag-handle">Drag here</Button>
          <p>
            Hello, this is the body of the draggable container. Cannot drag from
            here
          </p>
        </div>
      )
    },
    handle: {
      option: { type: 'string' },
      defaultValue: '.drag-handle'
    }
  },
  controls: {}
};
const Template = (args) => <Draggable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
