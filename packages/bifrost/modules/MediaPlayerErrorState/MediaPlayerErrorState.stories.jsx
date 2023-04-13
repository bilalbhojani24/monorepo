import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import MediaPlayerErrorState from './index';

const defaultConfig = {
  title: 'Application/Components/MediaPlayerErrorState',
  component: MediaPlayerErrorState,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import MediaPlayerErrorState from 'bifrost/MediaPlayerErrorState'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <MediaPlayerErrorState {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
