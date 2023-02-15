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
      defaultValue: (
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          incidunt, officia sed vero perspiciatis neque labore aspernatur
          numquam temporibus suscipit deserunt nulla recusandae voluptates quos
          iure excepturi exercitationem, nisi a? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Unde labore quod temporibus cumque,
          eaque aperiam maxime praesentium. Earum quidem ipsum quia a similique
          est, maxime vero quos odit beatae officia.
        </span>
      )
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: 'line-clamp-1'
    },
    headerTooltipProps: {
      option: { type: 'object' },
      defaultValue: { theme: 'dark' }
    },
    tooltipContent: {
      option: { type: 'null' },
      defaultValue: (isTooltipVisible, children) => (
        <p className="text-base-300 mb-0 px-4">
          Customized tooltip content {children}
        </p>
      )
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
