import React, { useRef, useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import RichTextEditor from './index';

const defaultConfig = {
  title: 'Application/Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import RichTextEditor from 'bifrost/RichTextEditor'"
          }
        />
      )
    }
  },
  argTypes: {
    assetUploadURL: {
      option: { type: 'string' },
      defaultValue: 'https://api.imgbb.com/1/upload'
    },
    getEditorContent: {
      option: { type: null },
      defaultValue: () => {}
    },
    onChange: {
      option: { type: null },
      defaultValue: (value) => {
        console.log(value);
      }
    },
    height: {
      defaultValue: 500,
      control: { type: 'string' }
    },
    value: {
      control: { type: 'string' },
      defaultValue:
        '<h1>This is controlled component example of text editor</h1>'
    },
    initialValue: {
      control: { type: 'string' },
      defaultValue: ''
    },
    width: {
      control: { type: 'string' },
      defaultValue: '100%'
    },
    wrapperClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <RichTextEditor {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };

export const UncontrolledTextEditor = () => {
  const ref = useRef(null);
  return (
    <>
      <Button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log(ref.current.getContent());
        }}
        wrapperClassName="mb-4"
      >
        Get Data
      </Button>
      <RichTextEditor
        editorRef={ref}
        initialValue="<p>Hello world!</p>"
        height={600}
        assetUploadURL="https://api.imgbb.com/1/upload"
      />
    </>
  );
};

export const ControlledTextEditor = () => {
  const [value, setValue] = useState('<p>Text 1</p>');

  return (
    <>
      <RichTextEditor
        value={value}
        height={600}
        onChange={(val) => setValue(val)}
        assetUploadURL="https://api.imgbb.com/1/upload"
      />
    </>
  );
};
