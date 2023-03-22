import React from 'react';
import { FolderIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import AccordionInteractiveHeader from '../AccordionInteractiveHeader';
import AccordionPanel from '../AccordionPanel';
import AccordionSimpleHeader from '../AccordionSimpleHeader';
import Badge from '../Badge';

import Accordion from './index';

const defaultConfig = {
  title: 'Application/Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Accordion from '@browserstack/bifrost'"}
        />
      )
    }
  },
  argTypes: {
    openByDefault: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    triggerClassName: {
      option: { type: 'string' },
      defaultValue: 'px-6 pt-4 bg-brand-100'
    }
  },
  controls: {}
};

const Template = (args) => <Accordion {...args} />;

const InteractiveAccordion = Template.bind({});
InteractiveAccordion.args = {
  defaultOpen: true,
  children: [
    <AccordionInteractiveHeader
      trigger={<input aria-label="custom checkbox" type="checkbox" />}
      title={
        <span className="flex  gap-2">
          <span className="truncate">Title goes in here</span>
          <Badge role="none" text="A1" modifier="success" />
          <Badge role="none" text="A2" modifier="error" />
          <Badge role="none" text="A3" modifier="warn" />
          <Badge role="none" text="A4" />
        </span>
      }
      asideContent={
        <div className="text-base-600 m-1 flex items-start justify-end gap-6 text-sm font-light">
          <a className="flex items-center gap-1.5 hover:underline" href="#/">
            <FolderIcon className="h-4 w-4" />
            Meta Column Text
          </a>
          <a className="flex items-center gap-1.5 hover:underline" href="#/">
            <FolderIcon className="h-4 w-4" />
            Meta Column Text 2
          </a>
          <span className="flex gap-2">
            <Badge text="B1" modifier="success" />
            <Badge text="B2" modifier="error" />
            <Badge text="B3" modifier="warn" />
            <Badge text="B4" />
          </span>
        </div>
      }
    >
      <div className="text-base-500 my-2 flex gap-3 py-1 text-sm font-light">
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="h-4 w-4" /> Meta data is here
        </a>
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="h-4 w-4" /> Meta data is here
        </a>
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="h-4 w-4" /> Meta data is here
        </a>
      </div>
    </AccordionInteractiveHeader>,
    <AccordionPanel>
      <div className="bg-base-100 my-2 flex h-16 items-center justify-center">
        main content comes here
      </div>
    </AccordionPanel>
  ]
};

const SimpleAccordion = Template.bind({});
SimpleAccordion.args = {
  defaultOpen: true,
  children: [
    <AccordionSimpleHeader title="Title goes in here" />,
    <AccordionPanel>
      <div className="bg-base-100 my-2 flex h-16 items-center justify-center">
        main content comes here
      </div>
    </AccordionPanel>
  ]
};

export default defaultConfig;
export { InteractiveAccordion, SimpleAccordion };
