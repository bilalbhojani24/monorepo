import React from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

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
      ),
    },
  },
  argTypes: {
    theme: {
      options: PAGE_HEADINGS_THEME,
      control: { type: 'select' },
      description: 'Set light or dark theme for the component.',
      type: { summary: 'STRING', required: false },
      defaultValue: PAGE_HEADINGS_THEME[0],
    },
    breadcrumbs: {
      defaultValue: [
        { name: 'Jobs', url: 'www.google.com', current: true },
        { name: 'Engineering', url: 'www.youtube.com', current: false },
        { name: 'Frontend Engineers', url: 'www.google.com', current: false },
      ],
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
          ),
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
          ),
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
          ),
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
          ),
        },
      ],
    },
    actions: {
      defaultValue: [
        {
          id: 'node-1',
          actionProps: {
            icon: (
              <PencilIcon
                className="text-base-500 -ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
            ),
            children: 'Edit',
            colors: 'white',
          },
          callback: () => {},
        },
        {
          id: 'node-2',
          actionProps: {
            icon: (
              <LinkIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
              />
            ),
            children: 'View',
            variant: 'primary',
          },
          callback: () => {},
        },
      ],
    },
  },
  controls: {},
};
const Template = (args) => <PageHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
