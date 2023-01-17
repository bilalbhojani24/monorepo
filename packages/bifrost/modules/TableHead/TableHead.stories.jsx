import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TableHead from './index';

const defaultConfig = {
  title: 'Application/Components/TableHead',
  component: TableHead,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import {TableHead} from '@browserstack/bifrost'"}
        />
      ),
    },
  },
  argTypes: {},
  controls: {},
};
const Template = (args) => <TableHead {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
