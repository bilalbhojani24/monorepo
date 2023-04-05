import React from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import {
  BANNER_ALIGN,
  BANNER_MODIFIER,
  BANNER_PLACEMENT
} from './const/bannerConstants';
import Banner from './index';

const inlineRadio = 'inline-radio';

const defaultConfig = {
  title: 'Application/Components/Banner',
  component: Banner,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Banner from 'bifrost/Banner'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=142-35545&t=TWCLo3KWhysdxj9F-0'
    }
  },

  argTypes: {
    align: {
      options: BANNER_ALIGN,
      controls: { type: inlineRadio },
      defaultValue: BANNER_ALIGN[0]
    },
    bannerIcon: {
      option: { type: null },
      defaultValue: (
        <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
      )
    },
    ctaButton: {
      option: { type: null },
      defaultValue: (
        <Button variant="primary" colors="white">
          Learn more
        </Button>
      )
    },
    description: {
      option: { type: 'string' },
      defaultValue: "Big news! We're excited to announce a brand new product."
    },
    isDismissButton: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    modifier: {
      options: BANNER_MODIFIER,
      controls: { type: inlineRadio },
      defaultValue: BANNER_MODIFIER[0]
    },
    onDismissClick: {
      option: { type: null },
      // eslint-disable-next-line no-console
      defaultValue: () => console.log('Dismiss clicked')
    },
    placement: {
      options: BANNER_PLACEMENT,
      controls: { type: inlineRadio },
      defaultValue: BANNER_PLACEMENT[0]
    }
  },
  controls: {}
};
const Template = (args) => <Banner {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
