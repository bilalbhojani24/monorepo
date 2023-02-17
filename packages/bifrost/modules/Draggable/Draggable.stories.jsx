import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Resizable from '../Resizable';

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
        <div className="absolute flex w-72 flex-col items-center justify-center border border-solid border-black p-4 text-center">
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
const DraggableAndResizable = Template.bind({});
Primary.parameters = {
  controls: {}
};
DraggableAndResizable.args = {
  children: (
    <div className="absolute">
      <Resizable
        className="relative flex flex-col items-center justify-center border border-solid border-black p-4 text-center"
        handle={(__resizeHandleAxis, ref) => (
          <span
            className="absolute bottom-0 mb-1 h-1 w-6 rounded bg-black hover:cursor-s-resize"
            ref={ref}
          />
        )}
        width={300}
        height={250}
        resizeHandles={['s']}
        minConstraints={[300, 200]}
        maxConstraints={[300, 500]}
      >
        <Button wrapperClassName="drag-handle">Drag here</Button>
        <p>
          Hello, this is the body of the draggable and resizable container.
          Cannot drag from here
        </p>
      </Resizable>
    </div>
  )
};
export default defaultConfig;
export { DraggableAndResizable, Primary };
