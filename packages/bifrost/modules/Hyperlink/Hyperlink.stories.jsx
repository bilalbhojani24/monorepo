import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { EnvelopeIcon } from '../Icon';

import Hyperlink from './index';

const defaultConfig = {
  title: 'Application/Components/Hyperlink',
  component: Hyperlink,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Hyperlink from 'bifrost/Hyperlink'"}
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
      control: { type: null },
      type: { summary: 'TEXT', required: false },
      description: 'Children props',
      defaultValue: (
        <>
          <span aria-hidden="true"> &rarr;</span>
          View
        </>
      )
    },
    onClick: {
      control: { type: null },
      type: { summary: 'TEXT', required: false },
      description: 'On anchore click',
      defaultValue: (e) => {
        e.preventDefault();
        console.log(e);
      }
    },
    href: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'relation',
      defaultValue: 'https://www.browserstack.com'
    },
    rel: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Redirection link',
      defaultValue: ''
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false }
    }
  },
  controls: {}
};
const Template = (args) => (
  <Hyperlink isCSR={false} {...args}>
    View
  </Hyperlink>
);

const LeadingIconTemplate = (args) => (
  <Hyperlink isCSR={false} {...args}>
    <EnvelopeIcon className="mr-1 h-4 w-4" />
    View
  </Hyperlink>
);

const TrailingIconTemplate = (args) => (
  <Hyperlink isCSR={false} {...args}>
    View
    <EnvelopeIcon className="ml-1 h-4 w-4" />
  </Hyperlink>
);

const Primary = Template.bind({});
const LeadingIcon = LeadingIconTemplate.bind({});
const TrailingIcon = TrailingIconTemplate.bind({});

Primary.parameters = {
  controls: {}
};

LeadingIcon.args = {
  onClick: null
};

export default defaultConfig;
export { LeadingIcon, Primary, TrailingIcon };
