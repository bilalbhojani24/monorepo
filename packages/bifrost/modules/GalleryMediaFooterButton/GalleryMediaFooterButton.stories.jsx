import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import GalleryMediaFooterButton from './index';

const defaultConfig = {
  title: 'Application/Components/GalleryMediaFooterButton',
  component: GalleryMediaFooterButton,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import GalleryMediaFooterButton from 'bifrost/GalleryMediaFooterButton'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <GalleryMediaFooterButton {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
