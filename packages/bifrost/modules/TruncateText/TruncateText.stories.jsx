import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdErrorOutline } from '../Icon';

import TruncateText from './index';

const defaultConfig = {
  title: 'Application/Components/TruncateText',
  component: TruncateText,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TruncateText from 'bifrost/TruncateText'"}
        />
      )
    }
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero incidunt, officia sed vero perspiciatis neque labore aspernatur numquam temporibus suscipit deserunt nulla recusandae voluptates quos iure excepturi exercitationem, nisi a?'
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    truncateByLine: {
      option: { type: 'number' },
      defaultValue: 2
    },
    headerTooltipProps: {
      option: { type: 'object' },
      defaultValue: { theme: 'dark' }
    },
    tooltipTriggerIcon: {
      option: { type: null },
      defaultValue: <MdErrorOutline className="max-h-4" />
    },
    hidetooltipTriggerIcon: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    containerClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    variant: {
      option: { type: 'string' },
      defaultValue: 'p'
    }
  },
  controls: {}
};
const Template = (args) => <TruncateText {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
