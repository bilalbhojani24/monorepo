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

import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';
import PageHeadings from './index';

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
    metaData: {
      defaultValue: [
        {
          id: 'node-1',
          metaNode: (
            <>
              <BriefcaseIcon
                className="text-base-400 mr-1.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              Full-time
            </>
          )
        },
        {
          id: 'node-2',
          metaNode: (
            <>
              <MapPinIcon
                className="text-base-400 mr-1.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              Remote
            </>
          )
        },
        {
          id: 'node-3',
          metaNode: (
            <>
              <CurrencyDollarIcon
                className="text-base-400 mr-1.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              $120k &ndash; $140k
            </>
          )
        },
        {
          id: 'node-4',
          metaNode: (
            <>
              <CalendarIcon
                className="text-base-400 mr-1.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
              Closing on January 9, 2020
            </>
          )
        }
      ]
    },
    actions: {
      defaultValue: []
    },
    wrapperClassName: {
      defaultValue: 'p-8 rounded-lg border border-base-300'
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
    // <div className="flex items-center">
    <>
      <div className="mr-2">
        <Dropdown
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
            }
          ]}
        />
      </div>
      <Dropdown
        triggerVariant="menu-button"
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
          }
        ]}
      />
    </>
    // </div>
  )
};

export default defaultConfig;
export { ActionsWithButtons, ActionsWithDropdowns, Primary };
