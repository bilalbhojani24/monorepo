import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TableBody from './index';

const defaultConfig = {
  title: 'Application/Components/TableBody',
  component: TableBody,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import {TableBody} from '@browserstack/bifrost'"}
        />
      ),
    },
  },

  argTypes: {},
  controls: {},
};
const Template = (args) => <TableBody {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
