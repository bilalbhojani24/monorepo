import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import TableCell from '../TableCell';

import TableRow from './index';

const defaultConfig = {
  title: 'Application/Components/TableRow',
  component: TableRow,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import {TableRow} from '@browserstack/bifrost'"}
        />
      )
    }
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <TableCell>Bilal Bhojani</TableCell>
          <TableCell>bilal@browserstcak.com</TableCell>
          <TableCell>8888888888</TableCell>
          <TableCell>Member</TableCell>
          <TableCell>$123</TableCell>
          <TableCell>12.00</TableCell>
        </>
      )
    },
    isSelected: {
      option: { type: 'boolean' },
      defaultValue: true
    }
  },
  onRowClick: {
    control: { type: 'text' },
    defaultValue: () => console.log('Row clicked')
  },
  controls: {}
};
const Template = (args) => <TableRow {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
