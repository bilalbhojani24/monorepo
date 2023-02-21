import React, { useRef, useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import RichTextEditor from './index';

const onAssetUpload = async (files) => {
  const formData = new FormData();
  const file = files[0];
  formData.append('image', file);
  formData.append('key', '95939cf0c027f2645e60ec39295b6530');

  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData
  });
  const result = await res.json();

  return result.data.url;
};

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
    assetsURL: {
      option: { type: 'string' },
      defaultValue: 'http://127.0.0.1:5500/packages/bifrost/dist/'
    },
    onAssetUpload: {
      option: { type: 'string' },
      defaultValue: onAssetUpload
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
      defaultValue: 100,
      control: { type: 'string' }
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Text Editor'
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
    wrapperClassName: {
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
          console.log(ref.current.getContent());
        }}
        wrapperClassName="mb-4"
      >
        Get Data
      </Button>
      <RichTextEditor
        assetsURL="http://127.0.0.1:5500/packages/bifrost/dist/"
        editorRef={ref}
        initialValue="<p>Hello world!</p>"
        height={100}
        onAssetUpload={onAssetUpload}
        id="uc1"
        label="RTE 1"
      />
    </>
  );
};

export const ControlledTextEditor = () => {
  const [value, setValue] = useState('<p>Text 1</p>');

  return (
    <>
      <RichTextEditor
        assetsURL="http://127.0.0.1:5500/packages/bifrost/dist/"
        id="one"
        value={value}
        height={100}
        onChange={(val) => setValue(val)}
        onAssetUpload={onAssetUpload}
      />
    </>
  );
};
