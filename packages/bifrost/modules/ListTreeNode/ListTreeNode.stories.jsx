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
      ),
    },
  },
  argTypes: {},
  controls: {},
};

const FolderNodeTemplate = (args) => (
  <Disclosure>
    <ListTreeNode {...args} />
  </Disclosure>
);

const FolderNode = FolderNodeTemplate.bind({});

export default defaultConfig;
export { FolderNode };
