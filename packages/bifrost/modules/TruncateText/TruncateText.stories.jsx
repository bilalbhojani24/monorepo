import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdErrorOutline } from '../Icon';
import TableCell from '../TableCell';
import TableRow from '../TableRow';

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
    },
    design: {
      type: 'figma',
      url: ''
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
      defaultValue: (
        <p className="text-base-300 mb-0 px-4">Customized tooltip content</p>
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
    },
    isTooltip: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    tooltipAriaLabel: {
      option: { type: 'string' },
      defaultValue: 'truncated text'
    },
    isFullWidthTooltip: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    truncateUsingClamp: {
      option: { type: 'boolean' },
      description:
        'Line clamp doesnt work when the text is not going to next line. Make this option false and pass custom width to trucate by width',
      defaultValue: true
    }
  },
  controls: {}
};
const Template = (args) => <TruncateText {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

const FullWidthDelayedTooltip = Template.bind({});
FullWidthDelayedTooltip.args = {
  headerTooltipProps: {
    delay: 600
  },
  isFullWidthTooltip: true
};
Primary.parameters = {
  controls: {}
};

const TruncateInsideTableTemplate = (args) => (
  <TableRow>
    <TableCell>12</TableCell>
    <TableCell>
      <div>
        <TruncateText {...args}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ipsam
          esse magni maiores deleniti officiis, architecto et sed exercitationem
          fugit in rerum quae modi. Expedita ut laudantium cumque explicabo
          voluptate?
        </TruncateText>
      </div>
    </TableCell>
    <TableCell>12</TableCell>
    <TableCell>12</TableCell>
    <TableCell>12</TableCell>
    <TableCell>12</TableCell>
  </TableRow>
);

const TruncateInsideTable = TruncateInsideTableTemplate.bind({});
TruncateInsideTable.args = {
  wrapperClassName: 'w-28',
  truncateUsingClamp: false,
  hidetooltipTriggerIcon: true,
  isFullWidthTooltip: true
};

export default defaultConfig;
export { FullWidthDelayedTooltip, Primary, TruncateInsideTable };
