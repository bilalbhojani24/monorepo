import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdPerson } from '../Icon';

import Metadata from './index';

const defaultConfig = {
  title: 'Application/Components/Metadata',
  component: Metadata,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Metadata from 'bifrost/Metadata'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    icon: {
      option: { type: null },
      defaultValue: <MdPerson className="h-5 w-5" />
    },
    metaDescription: {
      option: { type: 'string' },
      defaultValue: 'John Doe'
    },
    textColorClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Metadata {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
