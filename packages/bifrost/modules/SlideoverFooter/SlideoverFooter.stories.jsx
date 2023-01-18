import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import { POSITION } from './const/slideoverFooterConstants';
import SlideoverFooter from './index';

const defaultConfig = {
  title: 'Application/Components/SlideoverFooter',
  component: SlideoverFooter,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SlideoverFooter from '@browserstack/bifrost'"
          }
        />
      ),
    },
  },

  argTypes: {
    backgroundColorClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    isBorder: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    position: {
      options: POSITION,
      controls: { type: 'inline-radio' },
      defaultValue: POSITION[0],
    },
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <Button colors="white">Cancel</Button>
          <Button colors="danger">Deactivate</Button>
        </>
      ),
    },
  },
  controls: {},
};
const Template = (args) => <SlideoverFooter {...args} />;
const SingleButtonTemplate = (args) => <SlideoverFooter {...args} />;
const FullWidthButtonTemplate = (args) => <SlideoverFooter {...args} />;
const RightAlignedButtonTemplate = (args) => <SlideoverFooter {...args} />;

const Primary = Template.bind({});
const SingleButton = SingleButtonTemplate.bind({});
const FullWidthButton = FullWidthButtonTemplate.bind({});
const RightAlignedButton = RightAlignedButtonTemplate.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { FullWidthButton, Primary, RightAlignedButton, SingleButton };

SingleButton.args = {
  children: (
    <>
      <Button colors="brand" fullWidth>
        Deactivate
      </Button>
    </>
  ),
};

FullWidthButton.args = {
  children: (
    <>
      <Button colors="white" fullWidth>
        Cancel
      </Button>
      <Button colors="brand" fullWidth>
        Deactivate
      </Button>
    </>
  ),
};

RightAlignedButton.args = {
  children: (
    <>
      <Button colors="white">Cancel</Button>
      <Button colors="danger">Deactivate</Button>
    </>
  ),
  position: POSITION[1],
};
