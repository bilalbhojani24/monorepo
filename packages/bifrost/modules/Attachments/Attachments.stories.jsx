import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import Attachments from './index';

const defaultConfig = {
  title: 'Application/Components/Attachments',
  component: Attachments,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Attachments from 'bifrost/Attachments'"}
        />
      )
    }
  },
  argTypes: {
    attachments: {
      defaultValue: [
        {
          fileName: 'abc.xyz',
          actions: (
            <Button variant="primary" colors="danger" size="extra-small">
              Delete
            </Button>
          )
        },
        {
          fileName: 'lorem.ipsum',
          actions: (
            <div className="flex items-center gap-2">
              <Button variant="primary" colors="danger" size="extra-small">
                Delete
              </Button>
              <p className="text-base-500 text-xl">|</p>
              <Button variant="primary" colors="danger" size="extra-small">
                Delete
              </Button>
            </div>
          )
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <Attachments {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
