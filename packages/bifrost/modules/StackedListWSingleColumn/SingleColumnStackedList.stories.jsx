import React from 'react';
import StackedListWSingleColumn from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STACK_LIST_MODES } from './const/stackedListWSingleColumnConstants';
import Button from '../Button';

const list = [
  {
    id: 1,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    textAside: '1d ago',
    link: '#',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 2,
    heading: 'Velit placeat sit ducimus non sed',
    subHeading: 'Gloria Roberston',
    textAside: '1d ago',
    link: '#',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
];

const defaultConfig = {
  title: 'Application/Components/StackedListWSingleColumn',
  component: StackedListWSingleColumn,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={"import StackedListWSingleColumn from 'bifrost/StackedListWSingleColumn'"}
          />
        );
      },
    },
  },
  argTypes: {
    descriptionMaxLength: {
      options: { type: 'number' },
      defaultValue: 150,
    },
    handleListClick: {
      options: { type: null },
      defaultValue: (message) => {
        console.log(message);
      },
    },
    list: {
      defaultValue: list,
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in Stacked list',
      control: { type: 'object' },
    },
    format: {
      defaultValue: STACK_LIST_MODES[0],
      options: STACK_LIST_MODES,
      control: { type: 'select' },
      description: 'Format of single column stack list component',
      type: { summary: 'STRING', required: false },
    },
    action: {
      defaultValue: {
        variant: 'white',
        buttonType: 'half-rounded-button',
        wrapperClassName: 'flex w-full justify-center',
        onClick: () => console.log('button clicked'),
      },
      type: { summary: 'OBJECT', required: false },
      description: 'Action to be conducted',
      control: { type: 'object' },
    },
    actionTitle: {
      type: { summary: 'STRING', required: false },
      description: 'Text content of action button',
      control: { type: 'text' },
      defaultValue: 'Demo',
    },
  },
  controls: {},
};
const Template = (args) => <StackedListWSingleColumn {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
