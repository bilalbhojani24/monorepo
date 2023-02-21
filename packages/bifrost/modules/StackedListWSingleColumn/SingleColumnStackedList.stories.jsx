import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import { STACK_LIST_MODES } from './const/stackedListWSingleColumnConstants';
import StackedListWSingleColumn from './index';

const list = [
  {
    id: 1,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    textAside: '1d ago',
    link: '#',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.'
  },
  {
    id: 2,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    textAside: '1d ago',
    link: '#',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.'
  }
];

const defaultConfig = {
  title: 'Application/Components/StackedListWSingleColumn',
  component: StackedListWSingleColumn,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import StackedListWSingleColumn from 'bifrost/StackedListWSingleColumn'"
          }
        />
      )
    }
  },
  argTypes: {
    descriptionMaxLength: {
      options: { type: 'number' },
      defaultValue: 150
    },
    handleListClick: {
      options: { type: null },
      defaultValue: (message) => {
        // eslint-disable-next-line no-console
        console.log(message);
      }
    },
    list: {
      defaultValue: list,
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in Stacked list',
      control: { type: 'object' }
    },
    variant: {
      defaultValue: STACK_LIST_MODES[0],
      options: STACK_LIST_MODES,
      control: { type: 'select' },
      description: 'variant of single column stack list component',
      type: { summary: 'STRING', required: false }
    },
    action: {
      defaultValue: (
        <Button colors="white" fullWidth>
          Action
        </Button>
      )
    }
  },
  controls: {}
};
const ContentWithActionTemplate = (args) => (
  <StackedListWSingleColumn {...args} />
);
const ContentWithAction = ContentWithActionTemplate.bind({});
ContentWithAction.parameters = {
  controls: {}
};

const TrucatedPreviewTemplate = (args) => (
  <StackedListWSingleColumn {...args} />
);
const TrucatedPreview = TrucatedPreviewTemplate.bind({});
TrucatedPreview.args = {
  variant: STACK_LIST_MODES[1]
};

export default defaultConfig;
export { ContentWithAction, TrucatedPreview };
