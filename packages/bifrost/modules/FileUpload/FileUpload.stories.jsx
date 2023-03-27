import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdOutlineInsertPhoto } from '../Icon';

import FileUpload from './index';

const defaultConfig = {
  title: 'Application/Components/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import FileUpload from 'bifrost/FileUpload'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    linkText: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem',
      defaultValue: 'Upload a file'
    },
    heading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem',
      defaultValue: 'or drag and drop'
    },
    subHeading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem',
      defaultValue: 'PNG, JPG, GIF up to 10MB'
    },
    multiple: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    isUploading: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    label: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'input label',
      defaultValue: 'inputFile'
    },
    accept: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'input label',
      defaultValue: 'image/*,.pdf'
    },
    onChange: {
      type: { summary: 'FUNCTION', required: false },
      description: 'Function callback when a file is uploaded',
      control: { type: 'select' }
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    },
    icon: {
      defaultValue: (
        <MdOutlineInsertPhoto className="text-base-500 mx-auto h-6 w-6" />
      )
    }
  },
  controls: {}
};
const BaseTemp = (args) => <FileUpload {...args} />;
const Base = BaseTemp.bind({});
Base.parameters = {
  controls: {}
};

const UploadingTemp = (args) => <FileUpload {...args} />;
const Uploading = UploadingTemp.bind({});
Uploading.parameters = {
  controls: {}
};
Uploading.args = {
  isUploading: true,
  heading: 'Uploading...'
};

export default defaultConfig;
export { Base, Uploading };
