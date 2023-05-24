import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Resizable from './index';

const defaultConfig = {
  title: 'Application/Components/Resizable',
  component: Resizable,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Resizable from 'bifrost/Resizable'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <span>
          ResizableBox with custom handle in south axis. Min height of 200 and
          max of 580.
        </span>
      )
    },
    handle: {
      option: { type: 'function' },
      defaultValue: function foo(__resizeHandleAxis, ref) {
        return (
          <span
            className="absolute bottom-0 mb-1 h-1 w-6 rounded bg-black hover:cursor-s-resize"
            ref={ref}
          />
        );
      }
    },
    className: {
      option: { type: 'string' },
      defaultValue:
        'flex justify-center relative items-center border border-solid border-black text-center p-4'
    },
    width: {
      option: { type: 'number' },
      defaultValue: 300
    },
    height: {
      option: { type: 'number' },
      defaultValue: 250
    },
    resizeHandles: {
      option: { type: 'array' },
      defaultValue: ['s']
    },
    minConstraints: {
      option: { type: 'array' },
      defaultValue: [300, 200]
    },
    maxConstraints: {
      option: { type: 'array' },
      defaultValue: [300, 580]
    },
    handleSize: {
      option: { type: 'array' },
      defaultValue: [1, 6]
    }
  },
  controls: {}
};
const Template = (args) => <Resizable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
