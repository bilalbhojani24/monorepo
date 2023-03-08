import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Accordion from './Accordion';

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

const AccordionBasicTemplate = (args) => (
  <Accordion
    {...args}
    triggerContentNode={
      <h1>
        <span className="text-base-900  block text-center text-3xl font-bold leading-8 tracking-tight">
          Accordion Example
        </span>
      </h1>
    }
    panelContentNode={
      <div className="prose prose-lg text-base-500 bg-info-100 px-6">
        <p>
          The accordion is divided into two parts, the triger above and the
          panel below. both the trigger and the panel consist of projection
          containers so that any dom node can be projected inside of them. the
          component makes no assumptions in terms of structure except the
          chevron to provide maximum flexibility. the padding around the chevron
          itself can be adjusted using the
          <code className="bg-info-200 rounded">triggerClassName</code> prop.
          the top border for the separator can be added similarly
        </p>
      </div>
    }
    onTriggerClick={(e) => {
      // eslint-disable-next-line no-console
      console.log('onTriggerClick!');
    }}
    onChevronClick={() => {
      // eslint-disable-next-line no-console
      console.log('onChevronClick!');
    }}
  />
);

const AccordionBasic = AccordionBasicTemplate.bind({});

export default defaultConfig;
export { AccordionBasic };
