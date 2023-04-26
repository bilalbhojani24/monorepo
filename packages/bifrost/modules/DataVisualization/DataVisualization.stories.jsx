import React from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
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

const options = [
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
  }
];

const footerText = 'Subtext or supplementary info here';
const footerLink = 'Learn more';
const tooltipAria = 'header-info-tooltip';
const optionsArr = ['Edit', 'Duplicate', 'Archive'];

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=505-8706&t=TWCLo3KWhysdxj9F-0'
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
      defaultValue: 'loream'
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
        description: footerText,
        linkText: footerLink,
        linkTo: 'https://www.google.com'
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
          changeType: 'decrease',
          difference: '35',
          description: 'Kpi info',
          percentage: '69',
          direction: DATA_VISUALIZATION_STATS_DIRECTION[0]
        }
      ]
    },
    filterDropdown: {
      defaultValue: (
        <Dropdown>
          <DropdownTrigger>Dropdown 1</DropdownTrigger>
          <DropdownOptionGroup>
            {options.map((op) => (
              <DropdownOptionItem option={op} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>
      )
    },
    otherOptions: {
      defaultValue: (
        <Dropdown>
          <DropdownTrigger>Dropdown 2</DropdownTrigger>
          <DropdownOptionGroup>
            {options.map((op) => (
              <DropdownOptionItem option={op} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>
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
        children: <MdInfoOutline className="text-base-700" />,
        size: 'extra-small',
        theme: 'dark'
      }
    }
  },
  controls: {}
};
const Template = (args) => <DataVisualization {...args} />;
const DataVizWithFooterOnClickTemplate = (args) => (
  <DataVisualization {...args} />
);

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('loream')).toBeVisible();
  await expect(canvas.queryAllByRole('button').length).toBe(2);
  await expect(canvas.getByText('02%')).toBeVisible();
  await expect(canvas.getByText('69%')).toBeVisible();
  await expect(canvas.getByText('65%')).toBeVisible();
  await expect(canvas.getByText('35%')).toBeVisible();
  await expect(canvas.getByText(footerText)).toBeVisible();
  await expect(canvas.getByText(footerLink)).toBeVisible();
  await userEvent.click(canvas.queryAllByRole('button')[0]);
  await delay(1);
  const buttons = document.querySelectorAll('button');
  await delay(1);
  buttons.forEach(async (item) => {
    if (Array.prototype.indexOf.call(buttons, item) > 4) {
      await expect(optionsArr.includes(item.firstChild.nodeValue)).toBe(true);
    }
  });
  await userEvent.hover(canvas.getByLabelText(tooltipAria));
};

const DataVizWithFooterOnClick = DataVizWithFooterOnClickTemplate.bind({});
DataVizWithFooterOnClick.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('loream')).toBeVisible();
  await expect(canvas.queryAllByRole('button').length).toBe(2);
  await expect(canvas.getByText('02%')).toBeVisible();
  await expect(canvas.getByText('69%')).toBeVisible();
  await expect(canvas.getByText('65%')).toBeVisible();
  await expect(canvas.getByText('35%')).toBeVisible();
  await expect(canvas.getByText(footerText)).toBeVisible();
  await expect(canvas.getByText(footerLink)).toBeVisible();
  await userEvent.click(canvas.queryAllByRole('button')[0]);
  await delay(1);
  const buttons = document.querySelectorAll('button');
  await delay(1);
  buttons.forEach(async (item) => {
    if (Array.prototype.indexOf.call(buttons, item) > 4) {
      await expect(optionsArr.includes(item.firstChild.nodeValue)).toBe(true);
    }
  });
  await userEvent.hover(canvas.getByLabelText(tooltipAria));
};

Primary.parameters = {
  controls: {}
};

DataVizWithFooterOnClick.args = {
  footerProps: {
    description: 'Subtext or supplementary info here',
    linkText: 'Learn more',
    linkTo: '#',
    onClick: (e) => {
      e.preventDefault();
    }
  }
};

const DataVisualizationDetail = Template.bind({});
DataVisualizationDetail.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('loream')).toBeVisible();
  await expect(canvas.getByText('02%')).toBeVisible();
  await expect(canvas.getByText('69%')).toBeVisible();
  await expect(canvas.getByText('65%')).toBeVisible();
  await expect(canvas.getByText('35%')).toBeVisible();
  await userEvent.hover(canvas.getByLabelText(tooltipAria));
};

DataVisualizationDetail.args = {
  hasWiderColumns: true,
  size: 'large',
  title: 'loream',
  desc: '',
  descPosition: DATA_VISUALIZATION_DESC_POSITION[0],
  analytics: null,
  footerProps: '',
  KpiProps: [
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
      changeType: 'decrease',
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
  ],
  otherOptions: null,
  filterDropdown: null,
  headerInfo: true,
  wrapperClassName: ''
};

export default defaultConfig;
export { DataVisualizationDetail, DataVizWithFooterOnClick, Primary };
