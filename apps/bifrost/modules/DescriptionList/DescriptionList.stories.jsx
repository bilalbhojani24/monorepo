import React from 'react';
import DescriptionList from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { descriptionsList } from './const/descriptionListConstants';

const defaultConfig = {
  title: 'Application/Components/DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import DescriptionList from 'bifrost/DescriptionList'"} />;
      }
    }
  },
  argTypes: {
    descriptions: {
      option: { type: null },
      defaultValue: descriptionsList
    },
    gridContainerClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    gridItemClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Application Infomration'
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue: 'Personal details and application'
    },
    wrapperClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <DescriptionList {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
