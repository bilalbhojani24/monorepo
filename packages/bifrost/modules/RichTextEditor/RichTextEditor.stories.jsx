import React, { useRef, useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import RichTextEditor from './index';

const onAssetUpload = async (blobInfo, progress) => {
  const formData = new FormData();
  const files = blobInfo.blob();
  formData.append('attachments[]', files);

  // image upload logic

  // const res = await axios.post(
  //   'https://teststack.bsstag.com/api/v1/projects/846/generic/attachments',
  //   formData
  // );

  progress(50);

  return 'https://thumbs.dreamstime.com/b/gateway-india-mumbai-gateway-india-arch-monument-built-th-century-mumbai-india-monument-was-138091856.jpg';
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
        onAssetUpload={onAssetUpload}
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
        onAssetUpload={onAssetUpload}
      />
    </>
  );
};
