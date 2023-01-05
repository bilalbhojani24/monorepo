import React from 'react';
import DataVisualization from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { DATA_VISUALIZATION_SIZES } from './const/dataVisualizationConstants';

const defaultConfig = {
  title: 'Application/Components/DataVisualization',
  component: DataVisualization,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import DataVisualization from 'bifrost/DataVisualization'"} />;
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      type: { summary: DATA_VISUALIZATION_SIZES.join(', '), required: false },
      options: DATA_VISUALIZATION_SIZES,
      description: 'Size of visualization card, it can be small, default, large, extra large or fit content',
      defaultValue: DATA_VISUALIZATION_SIZES[1]
    },
    title: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      description: 'Title of data visualization card',
      defaultValue: 'lorem'
    },
    desc: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      description: 'Description of data visualization card',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies justo in est imperdiet efficitur. Vestibulum pharetra pulvinar est, eget'
    },
    subDesc: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      description: 'Subdescription of data visualization card',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies justo in est imperdiet efficitur. Vestibulum pharetra pulvinar est, eget'
    },
    analytics: {
      type: { summary: 'NODE', required: false },
      description: 'Chart Node to be injected',
      defaultValue: null
    },
    footerProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'Object of props belonging to the Alerts component',
      control: { type: 'object' },
      defaultValue: {
        description: 'Subtext or supplementary info here',
        linkText: 'Learn more',
        linkTo: '#'
      }
    },
    statProps: {
      description: 'Array of objects containing stat info',
      defaultValue: [
        {
          title: 'lorem',
          changeType: 'increase',
          difference: '55',
          description: 'Array of objects containing stat info',
          percentage: '420'
        },
        {
          title: 'ipsum',
          changeType: 'descrease',
          difference: '35',
          description: 'Array of objects containing stat info',
          percentage: '69'
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <DataVisualization {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
