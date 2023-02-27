import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import MediaPlayerControlPanel from './index';

const defaultConfig = {
  title: 'Application/Components/MediaPlayerControlPanel',
  component: MediaPlayerControlPanel,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import MediaPlayerControlPanel from 'bifrost/MediaPlayerControlPanel'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <MediaPlayerControlPanel {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
