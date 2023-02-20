import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Dropdown from '../Dropdown';
import DropdownTriggerWIcon from '../DropdownTriggerWIcon';
import DropdownTriggerWText from '../DropdownTriggerWText';
import { MdAddCircle, MdInfoOutline } from '../Icon';
import TooltipBody from '../TooltipBody';
import TooltipFooter from '../TooltipFooter';
import TooltipHeader from '../TooltipHeader';

import {
  DATA_VISUALIZATION_DESC_POSITION,
  DATA_VISUALIZATION_SIZES,
  DATA_VISUALIZATION_STATS_DIRECTION
} from './const/dataVisualizationConstants';
import DataVisualization from './index';

const defaultConfig = {
  title: 'Application/Components/DataVisualization',
  component: DataVisualization,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DataVisualization from 'bifrost/DataVisualization'"
          }
        />
      )
    }
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      type: { summary: DATA_VISUALIZATION_SIZES.join(', '), required: false },
      options: DATA_VISUALIZATION_SIZES,
      description:
        'Size of visualization card, it can be small, default, large, extra large or fit content',
      defaultValue: DATA_VISUALIZATION_SIZES[1]
    },
    title: {
      control: { type: 'text' },
      type: { summary: 'TEXT' },
      description: 'Title of data visualization card',
      defaultValue: 'lorem'
    },
    desc: {
      control: { type: 'text' },
      type: { summary: 'TEXT' },
      description: 'Description of data visualization card',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies justo in est imperdiet efficitur. Vestibulum pharetra pulvinar est, eget'
    },
    descPosition: {
      control: { type: 'inline-radio' },
      type: {
        summary: DATA_VISUALIZATION_DESC_POSITION.join(', ')
      },
      options: DATA_VISUALIZATION_DESC_POSITION,
      description:
        'Place description of data visualization card at the top or bottom of the visualization',
      defaultValue: DATA_VISUALIZATION_DESC_POSITION[0]
    },
    analytics: {
      type: { summary: 'NODE' },
      description: 'Chart Node to be injected',
      defaultValue: null
    },
    footerProps: {
      type: { summary: 'OBJECT' },
      description: 'Object of props belonging to the Alerts component',
      control: { type: 'object' },
      defaultValue: {
        description: 'Subtext or supplementary info here',
        linkText: 'Learn more',
        linkTo: '#'
      }
    },
    KpiProps: {
      description: 'Array of objects containing Kpi info',
      defaultValue: [
        {
          id: 1,
          title: 'lorem',
          changeType: 'increase',
          difference: '65',
          description: 'Kpi info',
          percentage: '02',
          direction: DATA_VISUALIZATION_STATS_DIRECTION[0]
        },
        {
          id: 2,
          title: 'ipsum',
          changeType: 'descrease',
          difference: '35',
          description: 'Kpi info',
          percentage: '69',
          direction: DATA_VISUALIZATION_STATS_DIRECTION[0]
        }
      ]
    },
    filterDropdown: {
      defaultValue: (
        <Dropdown
          trigger={<DropdownTriggerWText>trigger</DropdownTriggerWText>}
          options={[
            {
              id: '1',
              body: 'Edit'
            },
            {
              id: '2',
              body: 'Duplicate',
              divider: false
            },
            {
              id: '3',
              body: 'Archive',
              divider: true
            },
            {
              id: '4',
              body: 'Edit'
            },
            {
              id: '5',
              body: 'Duplicate',
              divider: false
            },
            {
              id: '6',
              body: 'Archive',
              divider: true
            },
            {
              id: '7',
              body: 'Edit'
            },
            {
              id: '8',
              body: 'Duplicate',
              divider: false
            },
            {
              id: '9',
              body: 'Archive',
              divider: true
            }
          ]}
        />
      )
    },
    otherOptions: {
      defaultValue: (
        <Dropdown
          trigger={<DropdownTriggerWIcon variant="menu-button" />}
          options={[
            {
              id: '10',
              body: 'Edit'
            },
            {
              id: '11',
              body: 'Duplicate',
              divider: false
            },
            {
              id: '12',
              body: 'Archive',
              divider: true
            }
          ]}
        />
      )
    },
    headerInfo: {
      control: { type: 'boolean' },
      description: 'Enable/disable info icon besides the title section',
      type: { summary: 'BOOLEAN' },
      defaultValue: true
    },
    headerInfoTooltipProps: {
      defaultValue: {
        content: (
          <>
            <TooltipHeader>Title</TooltipHeader>
            <TooltipBody>
              Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit.
              Donec sodales augue eu viverra tempus.
            </TooltipBody>
            <TooltipFooter>
              <Button>Action 1</Button>
              <Button>Action 2</Button>
            </TooltipFooter>
          </>
        ),
        children: <MdInfoOutline />,
        size: 'extra-small',
        theme: 'dark'
      }
    }
  },
  controls: {}
};
const Template = (args) => <DataVisualization {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

const DataVisualizationDetail = (args) => (
  <DataVisualization
    {...args}
    hasWiderColumns
    size="large"
    title="This is title"
    desc=""
    descPosition={DATA_VISUALIZATION_DESC_POSITION[0]}
    analytics={null}
    footerProps=""
    KpiProps={[
      {
        id: 1,
        title: 'lorem',
        changeType: 'increase',
        difference: '65',
        description: 'desc',
        leadingIcon: <MdAddCircle />,
        percentage: '02',
        direction: DATA_VISUALIZATION_STATS_DIRECTION[1],
        trailingIconNode: (
          <MdInfoOutline
            className="h-4 w-4 shrink-0 cursor-pointer"
            aria-hidden="true"
          />
        )
      },
      {
        id: 2,
        title: 'ipsum',
        changeType: 'descrease',
        difference: '35',
        description: 'desc',
        leadingIcon: <MdAddCircle />,
        percentage: '69',
        direction: DATA_VISUALIZATION_STATS_DIRECTION[1],
        trailingIconNode: (
          <MdInfoOutline
            className="h-4 w-4 shrink-0 cursor-pointer"
            aria-hidden="true"
          />
        )
      }
    ]}
    otherOptions={null}
    filterDropdown={null}
    headerInfo
    headerInfoTooltipProps={args.headerInfoTooltipProps}
    wrapperClassName=""
  />
);

export default defaultConfig;
export { DataVisualizationDetail, Primary };
