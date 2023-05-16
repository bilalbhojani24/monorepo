import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import Hyperlink from '../Hyperlink';
import {
  CursorArrowRaysIcon,
  EllipsisVerticalIcon,
  EnvelopeOpenIcon,
  MdErrorOutline,
  UsersIcon
} from '../Icon';
import Tooltip from '../Tooltip';
import TooltipBody from '../TooltipBody';

import { STATS_VARIANTS } from './const/statsConstants';
import Stats from './index';

const title = 'Total Subscribers';
const dropdownOptions = [
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
const options = [
  {
    id: 1,
    name: title,
    stat: '71,897',
    graph: null,
    icon: <UsersIcon className="h-6 w-6 text-white" />,
    change: '12%',
    previousStat: '28.62%',
    changeType: 'increase',
    link: 'google.com',
    onClick: () => console.log('stats google.com')
  },
  {
    id: 2,
    name: 'Avg. Open Rate',
    stat: '58.16%',
    graph: null,
    icon: <EnvelopeOpenIcon className="h-6 w-6 text-white" />,
    change: '5.4%',
    previousStat: '50.62%',
    changeType: 'increase',
    link: 'data.com',
    onClick: () => console.log('stats data.com')
  },
  {
    id: 3,
    name: 'Avg. Click Rate',
    stat: '24.57%',
    graph: null,
    icon: <CursorArrowRaysIcon className="h-6 w-6 text-white" />,
    change: '3.2%',
    previousStat: '28.62%',
    changeType: 'decrease',
    link: 'wikipedia.com',
    onClick: () => console.log('stats wikipedia.com')
  },
  {
    id: 4,
    name: (
      <div className="flex items-center">
        Avg. Click Rate
        <MdErrorOutline className="ml-3" />
      </div>
    ),
    stat: (
      <div className="flex items-center">
        <MdErrorOutline className="mr-3" />
        24.57%
      </div>
    ),
    graph: null,
    icon: null,
    change: null,
    previousStat: null,
    changeType: null,
    link: null,
    onClick: () => console.log('stats null.com')
  }
];
const graphVariantOptions = [
  {
    id: 5,
    name: (
      <div className="flex items-center">
        Total Subscribers
        <MdErrorOutline className="ml-3" />
      </div>
    ),
    stat: '71,897',
    graph: (
      <div className="mb-2 flex h-28 justify-between">
        <div className="flex h-24 w-full flex-col justify-between">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-40 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">300</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 1</p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-48 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">310</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 2</p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-36 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">290</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 3</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-52 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">320</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 4</p>
          </div>
        </div>
      </div>
    ),
    icon: null,
    change: 23,
    previousStat: null,
    subText: null,
    changeType: 'decrease',
    link: null,
    onClick: () => console.log('stats null.com')
  },
  {
    id: 6,
    name: (
      <div className="flex items-center">
        {title}
        <Tooltip
          triggerAriaLabel="info-tooltip"
          content={
            <TooltipBody>
              Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit.
              Donec sodales augue eu viverra tempus.
            </TooltipBody>
          }
        >
          <MdErrorOutline className="ml-3" />
        </Tooltip>
      </div>
    ),
    stat: '71,897',
    graph: (
      <div className="mb-2 flex h-28 justify-between">
        <div className="flex h-24 w-full flex-col justify-between">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-40 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">300</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 1</p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-48 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">310</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 2</p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-36 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">290</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 3</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-info-500 h-3 w-52 rounded-r-full" />
              <p className="text-base-900 ml-2 text-xs">320</p>
            </div>
            <p className="text-base-500 text-right text-xs">Name 4</p>
          </div>
        </div>
      </div>
    ),
    icon: null,
    change: null,
    previousStat: null,
    subText: 'out of 100 tests',
    changeType: null,
    link: 'View all',
    menuDropdown: (
      <Dropdown
        onClick={(value) => {
          console.log(value);
        }}
      >
        <div className="flex">
          <DropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
          </DropdownTrigger>
        </div>

        <DropdownOptionGroup>
          {dropdownOptions.map((opt) => (
            <DropdownOptionItem key={opt.value} option={opt} />
          ))}
        </DropdownOptionGroup>
      </Dropdown>
    )
  }
];

const defaultConfig = {
  title: 'Application/Components/Stats',
  component: Stats,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Stats from 'bifrost/Stats'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=383-8972&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    textColor: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'text-brand-600'
    },
    heading: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'Last 30 days'
    },
    variant: {
      control: { type: 'inline-radio', required: true },
      type: {
        summary: Object.values(STATS_VARIANTS).join(', '),
        required: true
      },
      options: STATS_VARIANTS,
      description: 'Different variants',
      defaultValue: STATS_VARIANTS.WITHOUT_ICON
    },
    option: {
      defaultValue: {
        id: 1,
        name: title,
        stat: '71,897',
        icon: <UsersIcon className="h-6 w-6 text-white" />,
        change: '12%',
        previousStat: '28.62%',
        changeType: 'increase',
        subText: null,
        link: (
          <Hyperlink
            isCSR={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            wrapperClassName="font-medium"
          >
            View all
            <span className="sr-only"> Total Subscriber stats</span>
          </Hyperlink>
        ),
        onClick: () => console.log('stats -1')
      }
    }
  },
  controls: {}
};
const Template = (args) => <Stats {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Last 30 days')).toBeVisible();
  await expect(canvas.getByText(title)).toBeVisible();
  await expect(canvas.getByText('12%')).toBeVisible();
  await userEvent.click(canvas.getByText(title));
};
Primary.parameters = {
  controls: {}
};

export const StatsWithbrandIcon = () => (
  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {options.map((opt) => (
      <Stats key={opt.id} option={opt} variant={STATS_VARIANTS.WITH_ICON} />
    ))}
  </div>
);

export const SharedBorder = () => (
  <div className="divide-base-200 mt-5 grid grid-cols-1 divide-y overflow-hidden bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
    {options.map((opt) => (
      <Stats
        key={opt.id}
        option={opt}
        variant={STATS_VARIANTS.WITHOUT_ICON}
        cardWrapperClassname="rounded-none h-full"
      />
    ))}
  </div>
);

export const KpiVariantCard = () => (
  <div className="mt-5 grid grid-cols-1 divide-y overflow-hidden bg-white shadow">
    <Stats
      key={options[3].id}
      option={options[3]}
      variant={STATS_VARIANTS.KPI_VARIANT}
      cardWrapperClassname="rounded-none"
      hideBoxShadow
    />
  </div>
);

export const GraphVariantCard = () => (
  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <Stats
      key={graphVariantOptions[0].id}
      option={graphVariantOptions[0]}
      variant={STATS_VARIANTS.GRAPH_VARIANT}
    />
  </div>
);

export const NonClickableGraphVariantCard = () => (
  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <Stats
      key={graphVariantOptions[1].id}
      option={graphVariantOptions[1]}
      variant={STATS_VARIANTS.GRAPH_VARIANT}
    />
  </div>
);

export default defaultConfig;
export { Primary };
