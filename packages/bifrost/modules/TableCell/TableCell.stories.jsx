import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TableCell from './index';

const defaultConfig = {
  title: 'Application/Components/TableCell',
  component: TableCell,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import { TableCell } from '@browserstack/bifrost'"}
        />
      ),
    },
  },

  argTypes: {},
  controls: {},
};
const Template = (args) => <TableCell {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
