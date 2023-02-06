/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { imageUploadHandler } from '../helper';

const TextEditor = forwardRef((props, ref) => {
  const {
    assetUploadURL,
    height,
    placeholder,
    onChange,
    value,
    width,
    initialValue
  } = props;
  const editorRef = ref;

  return (
    <Editor
      apiKey="93wwi5nts6xoefzltfebudmklr0b6iedyvrg115pnula0wkd"
      onInit={(evt, editor) => {
        if (editorRef) editorRef.current = editor;
      }}
      initialValue={initialValue}
      height={height}
      value={value}
      onEditorChange={(newValue) => onChange?.(newValue)}
      init={{
        height,
        width,
        menubar: false,
        plugins: [
          'advlist',
          'lists',
          'link',
          'image',
          'anchor',
          'table',
          'help',
          'codesample'
        ],
        toolbar:
          'undo redo | bold italic strikethrough underline | blocks forecolor fontsize | alignleft aligncenter alignright alignjustify | bullist numlist  | image table blockquote codesample',
        image_title: true,
        file_picker_types: 'image',
        automatic_uploads: true,
        images_upload_handler: (blobInfo, progress) =>
          imageUploadHandler(blobInfo, progress, assetUploadURL),
        statusbar: false,
        content_css:
          'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/content/bifrost-theme/content.min.css',
        skin_url:
          'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/ui/bifrost-theme',
        placeholder
      }}
    />
  );
});

export default TextEditor;
