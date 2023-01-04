import React from 'react';
import PageHeadings from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  CheckIcon,
  LinkIcon,
  PencilIcon
} from '@heroicons/react/20/solid';

const defaultConfig = {
  title: 'Application/Components/PageHeadings',
  component: PageHeadings,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import PageHeadings from 'bifrost/PageHeadings'"} />;
      }
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
    breadcrumbData: {
      defaultValue: [
        { name: 'Jobs', url: 'www.google.com', current: true },
        { name: 'Engineering', url: 'www.google.com', current: false },
        { name: 'Frontend Engineers', url: 'www.google.com', current: false }
      ]
    },
    metaData: {
      defaultValue: [
        {
          id: 'node-1',
          metaNode: (
            <>
              <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
              Full-time
            </>
          )
        },
        {
          id: 'node-2',
          metaNode: (
            <>
              <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
              Remote
            </>
          )
        },
        {
          id: 'node-3',
          metaNode: (
            <>
              <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
              $120k &ndash; $140k
            </>
          )
        },
        {
          id: 'node-4',
          metaNode: (
            <>
              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-base-400" aria-hidden="true" />
              Closing on January 9, 2020
            </>
          )
        }
      ]
    },
    actionsData: {
      defaultValue: [
        {
          id: 'node-1',
          actionsNode: (
            <>
              <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-base-500" aria-hidden="true" />
              Edit
            </>
          ),
          actionFn: () => {
            console.log('Action button fn 1');
          },
          variant: 'white'
        },
        {
          id: 'node-2',
          actionsNode: (
            <>
              <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-base-500" aria-hidden="true" />
              View
            </>
          ),
          actionFn: () => {
            console.log('Action button fn 2');
          },
          variant: 'primary'
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <PageHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
