import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import MediaPlayer from './index';

const defaultConfig = {
  title: 'Application/Components/MediaPlayer',
  component: MediaPlayer,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import MediaPlayer from 'bifrost/MediaPlayer'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    url: {
      option: { type: 'string' },
      defaultValue:
        'https://app-automate.browserstack.com/s3-upload/bs-video-logs-aps/s3.ap-south-1/f03d9795ae1fbf870377f37044b9289ae2ae31ed/video-f03d9795ae1fbf870377f37044b9289ae2ae31ed.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2XUQHUQMLGDEA5FL%2F20230220%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230220T050336Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=16d538b21f50add0319653374d47d28edbedc525c48c0620d57afa259971a6bb'
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <MediaPlayer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
