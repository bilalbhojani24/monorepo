import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import GalleryPreview from './index';

const defaultConfig = {
  title: 'Application/Components/GalleryPreview',
  component: GalleryPreview,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import GalleryPreview from 'bifrost/GalleryPreview'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <GalleryPreview {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
