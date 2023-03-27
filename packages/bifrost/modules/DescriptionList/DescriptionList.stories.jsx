import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import {
  DESCRIPTION_LIST_ALIGNMENT,
  descriptionsList
} from './const/descriptionListConstants';
import DescriptionList from './index';

const defaultConfig = {
  title: 'Application/Components/DescriptionList',
  component: DescriptionList,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DescriptionList from 'bifrost/DescriptionList'"
          }
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=387-9150&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    alignment: {
      options: DESCRIPTION_LIST_ALIGNMENT,
      defaultValue: DESCRIPTION_LIST_ALIGNMENT[0],
      controls: { type: 'inline-radio' },
      description: 'The grid alignment of the description list'
    },
    descriptions: {
      option: { type: null },
      defaultValue: descriptionsList,
      description: 'List of all description items, attay of objects'
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Application Infomration',
      description: 'Heading of description list'
    },
    isStriped: {
      option: { type: 'boolean' },
      defaultValue: false,
      description: 'Striped rows'
    },
    isCard: {
      option: { type: 'boolean' },
      defaultValue: true,
      description: 'Shape of container in card form'
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue: 'Personal details and application',
      description: 'Subheading of description list'
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <DescriptionList {...args} />;
const LeftAlignedInCardStripedTemplate = (args) => (
  <DescriptionList {...args} />
);
const LeftAlignedWithActionsTemplate = (args) => <DescriptionList {...args} />;
const LeftAlignedWithoutCardTemplate = (args) => <DescriptionList {...args} />;
const TwoColumnLayoutTemplate = (args) => <DescriptionList {...args} />;

const Primary = Template.bind({});
const LeftAlignedInCardStriped = LeftAlignedInCardStripedTemplate.bind({});
const LeftAlignedWithoutCard = LeftAlignedWithoutCardTemplate.bind({});
const LeftAlignedWithActions = LeftAlignedWithActionsTemplate.bind({});
const TwoColumnLayout = TwoColumnLayoutTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  LeftAlignedInCardStriped,
  LeftAlignedWithActions,
  LeftAlignedWithoutCard,
  Primary,
  TwoColumnLayout
};

LeftAlignedInCardStriped.args = {
  alignment: DESCRIPTION_LIST_ALIGNMENT[0],
  isCard: true,
  isStriped: true
};

LeftAlignedWithoutCard.args = {
  alignment: DESCRIPTION_LIST_ALIGNMENT[0],
  isCard: false,
  isStriped: false
};

LeftAlignedWithActions.args = {
  alignment: DESCRIPTION_LIST_ALIGNMENT[0],
  isCard: true,
  isStriped: true
};

TwoColumnLayout.args = {
  alignment: DESCRIPTION_LIST_ALIGNMENT[1],
  isCard: true
};
