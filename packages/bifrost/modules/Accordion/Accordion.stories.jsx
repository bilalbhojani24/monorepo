import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import AccordionInteractiveHeader from '../AccordionInteractiveHeader';
import AccordionPanel from '../AccordionPanel';
import AccordionSimpleHeader from '../AccordionSimpleHeader';
import Badge from '../Badge';
import { MdOutlineFolder as FolderIcon } from '../Icon';

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
    defaultOpen: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    children: {
      default: <></>
    }
  },
  controls: {}
};

const Template = (args) => <Accordion {...args} />;

const InteractiveAccordion = Template.bind({});
InteractiveAccordion.args = {
  defaultOpen: true,
  wrapperAriaLabel: 'My Accordion',
  children: [
    <AccordionInteractiveHeader
      trigger={
        <input
          className="border-base-300 text-brand-600 focus:ring-brand-500  h-4 w-4 rounded focus:ring-2"
          aria-label="custom checkbox"
          type="checkbox"
        />
      }
      title={
        <span className="flex gap-2">
          <span className="truncate text-sm">Title goes in here</span>
          <Badge size="basic" role="none" text="A1" modifier="success" />
          <Badge size="basic" role="none" text="A2" modifier="error" />
          <Badge size="basic" role="none" text="A3" modifier="warn" />
          <Badge size="basic" role="none" text="A4" />
        </span>
      }
      asideContent={
        <div className="text-base-600 m-1 flex items-start justify-end gap-6 text-sm font-light">
          <a className="flex items-center gap-1.5 hover:underline" href="#/">
            <FolderIcon className="text-base-400 h-4 w-4" />
            <span className="truncate text-sm">Meta Column Text</span>
          </a>
          <a className="flex items-center gap-1.5 hover:underline" href="#/">
            <FolderIcon className="text-base-400 h-4 w-4" />
            <span className="truncate text-sm">Meta Column Text 2</span>
          </a>
          <span className="flex gap-2 text-xs">
            <Badge size="basic" text="B1" modifier="success" />
            <Badge size="basic" text="B2" modifier="error" />
            <Badge size="basic" text="B3" modifier="warn" />
            <Badge size="basic" text="B4" />
          </span>
        </div>
      }
    >
      <div className="text-base-500 my-1.5 flex gap-3 py-1 text-sm font-light">
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="text-base-400 h-4 w-4" />
          Meta data is here
        </a>
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="text-base-400 h-4 w-4" />
          Meta data is here
        </a>
        <a
          className="flex items-center gap-1 truncate hover:underline"
          href="#/"
        >
          <FolderIcon className="text-base-400 h-4 w-4" />
          Meta data is here
        </a>
      </div>
    </AccordionInteractiveHeader>,
    <AccordionPanel>
      <div className="bg-base-100 flex h-16 items-center justify-center">
        main content comes here
        <a href="#/">Some Link</a>
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
