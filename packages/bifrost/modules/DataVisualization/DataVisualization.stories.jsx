import React from 'react';
import DataVisualization from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { DATA_VISUALIZATION_SIZES, DATA_VISUALIZATION_DESC_POSITION } from './const/dataVisualizationConstants';
import Dropdown from '../Dropdown';

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
    descPosition: {
      control: { type: 'inline-radio' },
      type: { summary: DATA_VISUALIZATION_DESC_POSITION.join(', '), required: true },
      options: DATA_VISUALIZATION_DESC_POSITION,
      description: 'Place description of data visualization card at the top or bottom of the visualization',
      defaultValue: DATA_VISUALIZATION_DESC_POSITION[0]
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
    KpiProps: {
      description: 'Array of objects containing Kpi info',
      defaultValue: [
        {
          title: 'lorem',
          changeType: 'increase',
          difference: '65',
          description: 'Kpi info',
          percentage: '02',
          direction: 'vertical'
        },
        {
          title: 'ipsum',
          changeType: 'descrease',
          difference: '35',
          description: 'Kpi info',
          percentage: '69',
          direction: 'vertical'
        }
      ]
    },
    filterDropdown: {
      defaultValue: <Dropdown />
    },
    otherOptions: {
      defaultValue: <Dropdown triggerVariant="menu-button" />
    },
    headerInfo: {
      control: { type: 'boolean' },
      description: 'Enable/disable info icon besides the title section',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: true
    },
    headerInfoTooltipProps: {
      description: 'Props object for header tooltip component.',
      defaultValue: {
        description:
          'Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec sodales augue eu viverra tempus.',
        actionObject: {
          primaryButtonLabel: 'Action 1',
          primaryButtonUrl: 'www.facebook.com',
          secondaryButtonLabel: 'Action 2',
          secondaryButtonUrl: 'www.facebook.com'
        }
      }
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
