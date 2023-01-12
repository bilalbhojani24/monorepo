import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import { POSITION } from './const/modalFooterConstants';
import ModalFooter from './index';

const defaultConfig = {
  title: 'Application/Components/ModalFooter',
  component: ModalFooter,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ModalFooter from 'bifrost/ModalFooter'"}
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
const Template = (args) => <ModalFooter {...args} />;
const SingleButtonTemplate = (args) => <ModalFooter {...args} />;
const FullWidthButtonTemplate = (args) => <ModalFooter {...args} />;
const RightAlignedButtonTemplate = (args) => <ModalFooter {...args} />;

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
