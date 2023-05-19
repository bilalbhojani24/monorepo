import React, { useRef } from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ControlledTree } from '../ListTree/ListTree.stories';
import TruncateText from '../TruncateText';

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

const listTreeDemoDataSet = [
  {
    name: 'file A',
    contents: [
      {
        name: (
          <TruncateText wrapperClassName="line-clamp-1">
            file A-1 Really long file name case. Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industrys standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </TruncateText>
        ),
        contents: null
      },
      {
        name: 'file A-2',
        contents: [
          {
            name: 'file A-2-a',
            contents: null
          }
        ]
      }
    ]
  },
  {
    name: 'file 2',
    contents: [
      {
        name: 'file 2a',
        contents: null
      },
      {
        name: 'file 2b',
        contents: [
          {
            name: 'file 2b1',
            contents: null
          }
        ]
      }
    ]
  }
];

const ResizeableTreeExample = () => {
  const resizeRef = useRef(null);
  const onResizeStart = () => {
    resizeRef.current.style.opacity = 1;
  };
  const onResizeStop = () => {
    resizeRef.current.removeAttribute('style');
  };
  return (
    <Resizable
      resizeHandles={['e']}
      handleSize={[6, 1]}
      width={300}
      minConstraints={[300]}
      maxConstraints={[900]}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      handle={(__resizeHandleAxis, ref) => (
        <span
          className="group absolute right-0 top-0 h-full translate-x-1.5 px-1 hover:cursor-col-resize"
          ref={ref}
        >
          <span
            className="bg-brand-600 block h-full w-0.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ref={resizeRef}
          />
        </span>
      )}
      className="border-base-300 relative h-full border border-solid p-4"
    >
      <ControlledTree data={listTreeDemoDataSet} indent={1} />
    </Resizable>
  );
};

const Template = (args) => <Resizable {...args} />;

const ResizeableTreeTemplate = () => (
  <ResizeableTreeExample data={listTreeDemoDataSet} />
);

const Primary = Template.bind({});
const ResizeableTree = ResizeableTreeTemplate.bind({});
ResizeableTree.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  let treeItems = canvas.queryAllByRole('treeitem');
  await expect(treeItems.length).toBe(7);
  await userEvent.hover(canvas.queryAllByLabelText('menu-button')[0]);
  await userEvent.click(canvas.queryAllByLabelText('menu-button')[0]);
  const buttons = canvas.queryAllByRole('button');
  await userEvent.click(buttons[1]);
  await userEvent.click(buttons[9]);
  await userEvent.click(buttons[11]);
  treeItems = canvas.queryAllByRole('treeitem');
  await expect(treeItems.length).toBe(10);
  const tooltips = canvas.queryAllByRole('tooltip');
  await userEvent.hover(tooltips[3]);
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, ResizeableTree };
