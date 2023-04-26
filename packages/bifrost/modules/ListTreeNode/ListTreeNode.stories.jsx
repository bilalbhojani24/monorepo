import React from 'react';
import { Disclosure } from '@headlessui/react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ListTreeNode from './index';

const defaultConfig = {
  title: 'Application/Components/ListTree',
  component: ListTreeNode,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ListTree from '@browserstack/bifrost'"}
        />
      )
    }
  },
  argTypes: {
    nodeLabelClassName: {
      option: { type: 'string' },
      defaultValue: 'max-w-sm'
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Sample Name'
    },
    ariaLabel: {
      option: { type: 'string' },
      defaultValue: 'Sample Name'
    }
  },
  controls: {}
};

const FolderNodeTemplate = (args) => (
  <Disclosure>
    <div role="tree">
      <div role="group">
        <ListTreeNode {...args} />
      </div>
    </div>
  </Disclosure>
);

const FolderNode = FolderNodeTemplate.bind({});

export default defaultConfig;
export { FolderNode };
