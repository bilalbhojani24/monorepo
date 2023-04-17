import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Header from './index';

const DEFAULT_LINK = 'https://www.browserstack.com';

const defaultConfig = {
  title: 'Application/Components/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Header from 'bifrost/Header'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    },
    percy: {
      skip: true,
      name: 'header snapshot'
    }
  },
  argTypes: {
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    productName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: 'App Automate'
    },
    productLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: 'https://www.browserstack.com'
    },
    release: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      defaultValue: 'alpha'
    },
    documentationLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: ''
    },
    supportLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: ''
    },
    beamerProductId: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: 'XxcUulZf52793'
    },
    beamerOverlayTopProperty: {
      control: { type: 'number' },
      defaultValue: 64
    },
    showTestInsights: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: true },
      defaultValue: true
    },
    headerElementArray: {
      defaultValue: [
        'team',
        'pricing',
        'help',
        'account',
        'notifications',
        'search'
      ]
    },
    documentation: {
      defaultValue: {
        title: 'Documentation',
        options: [
          { name: 'lorem', link: DEFAULT_LINK },
          { name: 'ipsum', link: DEFAULT_LINK }
        ]
      }
    },
    references: {
      defaultValue: {
        title: 'References',
        options: [
          { name: 'lorem', link: DEFAULT_LINK },
          { name: 'ipsum', link: DEFAULT_LINK }
        ]
      }
    },
    others: {
      defaultValue: null
    },
    productArray: {
      defaultValue: [
        { name: 'Live', link: 'https://live.browserstack.com/dashboard' },
        { name: 'Automate', link: 'https://automate.browserstack.com' },
        {
          name: 'App Live',
          link: 'https://app-live.browserstack.com/dashboard'
        }
      ]
    },
    planButtonVisible: {
      defaultValue: true
    },
    isFreeUser: {
      defaultValue: true
    },
    onSignoutClick: {
      defaultValue: (e) => {
        e.preventDefault();
      }
    }
  },
  controls: {}
};
const Template = (args) => <Header {...args} />;
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const headerTextElements = [
    'App Automate',
    'alpha',
    // 'Live',
    // 'Automate',
    'Invite my Team',
    'Plans & Pricing',
    // 'Get Help',
    'Buy a Plan'
  ];

  await expect(canvas.getByLabelText('Browserstack Logo')).toBeVisible();
  await expect(canvas.getByLabelText('Notification button')).toBeVisible();
  await expect(canvas.getByLabelText('Search button')).toBeVisible();
  headerTextElements.forEach(async (item) => {
    await expect(canvas.getByText(item)).toBeVisible();
  });
  // 0 -> click and 1 -> Hover
  await userEvent.hover(canvas.getByLabelText('popover button')[0]);
  await userEvent.hover(canvas.getByLabelText('account popover'));
  const productPopover = await canvas.getAllByLabelText('product popover');
  await userEvent.hover(productPopover[0]);
};
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
