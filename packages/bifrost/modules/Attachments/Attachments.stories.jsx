import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { MdOutlineAttachFile } from '../Icon';

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
          ),
          id: '1'
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
          ),
          id: '2'
        }
      ]
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base accordion component'
    },
    icon: {
      defaultValue: (
        <MdOutlineAttachFile className="text-base-400 h-5 w-5 font-light" />
      )
    }
  },
  controls: {}
};
const Template = (args) => <Attachments {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('abc.xyz')).toBeVisible();
  await expect(canvas.getByText('lorem.ipsum')).toBeVisible();
  const buttons = canvas.queryAllByRole('button');
  buttons.forEach(async (button) => {
    await expect(button).toBeVisible();
    await userEvent.click(button);
  });
};
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
