import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import GalleryMediaActionbar from './index';

const defaultConfig = {
  title: 'Application/Components/GalleryMediaActionbar',
  component: GalleryMediaActionbar,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import GalleryMediaActionbar from 'bifrost/GalleryMediaActionbar'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <GalleryMediaActionbar {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
