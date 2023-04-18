import React from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon
} from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Dropdown from '../Dropdown';
import DropdownOptionGroup from '../DropdownOptionGroup';
import DropdownOptionItem from '../DropdownOptionItem';
import DropdownTrigger from '../DropdownTrigger';
import { EllipsisVerticalIcon } from '../Icon';
import Metadata from '../Metadata';

import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';
import PageHeadings from './index';

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

const defaultConfig = {
  title: 'Application/Components/PageHeadings',
  component: PageHeadings,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import PageHeadings from 'bifrost/PageHeadings'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=390-9204&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    theme: {
      options: PAGE_HEADINGS_THEME,
      control: { type: 'select' },
      description: 'Set light or dark theme for the component.',
      type: { summary: 'STRING', required: false },
      defaultValue: PAGE_HEADINGS_THEME[0]
    },
    breadcrumbs: {
      defaultValue: [
        { name: 'Jobs', url: 'www.google.com', current: true },
        { name: 'Engineering', url: 'www.youtube.com', current: false },
        { name: 'Frontend Engineers', url: 'www.google.com', current: false }
      ]
    },
    subSection: {
      defaultValue: (
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <Metadata
            metaDescription="Full-time"
            textColorClass="text-base-500 text-sm mt-1"
            icon={<BriefcaseIcon className="h-5 w-5" />}
          />
          <Metadata
            metaDescription="Remote"
            textColorClass="text-base-500 text-sm mt-1"
            icon={<MapPinIcon className="h-5 w-5" />}
          />
          <Metadata
            metaDescription="$120k – $140k"
            textColorClass="text-base-500 text-sm mt-1"
            icon={<CurrencyDollarIcon className="h-5 w-5" />}
          />
          <Metadata
            metaDescription="Closing on January 9, 2020"
            textColorClass="text-base-500 text-sm mt-1"
            icon={<CalendarIcon className="h-5 w-5" />}
          />
        </div>
      )
    },
    actions: {
      defaultValue: []
    },
    wrapperClassName: {
      defaultValue: 'p-8 rounded-lg border border-base-300'
    },
    breadcrumbWrapperClassName: {
      controls: { type: 'string' },
      defaultValue: ''
    },
    onBreadcrumbClick: {
      control: { type: null },
      defaultValue: (e, clickedItem) => {
        console.log(e, clickedItem);
      }
    }
  },
  controls: {}
};
const Template = (args) => <PageHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

const ActionsWithButtonsTemplate = (args) => <PageHeadings {...args} />;
const ActionsWithButtons = ActionsWithButtonsTemplate.bind({});
ActionsWithButtons.parameters = {
  controls: {}
};

const ActionsWithDropdownsTemplate = (args) => <PageHeadings {...args} />;
const ActionsWithDropdowns = ActionsWithDropdownsTemplate.bind({});
ActionsWithDropdowns.parameters = {
  controls: {}
};

ActionsWithButtons.args = {
  actions: (
    <>
      <Button
        variant="primary"
        size="default"
        onClick={(event) => {
          event.preventDefault();
        }}
        colors="white"
        icon={
          <PencilIcon
            className="text-base-500 -ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
        }
      >
        Edit
      </Button>
      <Button
        wrapperClassName="ml-3"
        variant="primary"
        size="default"
        onClick={(event) => {
          event.preventDefault();
        }}
        icon={
          <LinkIcon
            className="-ml-1 mr-2 h-5 w-5 text-white"
            aria-hidden="true"
          />
        }
      >
        View
      </Button>
    </>
  )
};

ActionsWithDropdowns.args = {
  actions: (
    <>
      <div className="mr-2">
        <Dropdown>
          <DropdownTrigger>trigger</DropdownTrigger>
          <DropdownOptionGroup>
            {options.map((op) => (
              <DropdownOptionItem option={op} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>
      </div>
      <Dropdown>
        <DropdownTrigger triggerAriaLabel="page heading dropdown trigger">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </DropdownTrigger>
        <DropdownOptionGroup>
          {options.map((op) => (
            <DropdownOptionItem option={op} />
          ))}
        </DropdownOptionGroup>
      </Dropdown>
    </>
    // </div>
  )
};

export default defaultConfig;
export { ActionsWithButtons, ActionsWithDropdowns, Primary };
