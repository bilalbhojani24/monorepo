/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import {
  dialogConfig,
  TINYMCE_API_KEY
} from '../const/richTextEditorConstants';

const TextEditor = forwardRef((props, ref) => {
  const {
    onAssetUpload,
    height,
    placeholder,
    onChange,
    value,
    width,
    initialValue,
    label
  } = props;

  const editorRef = ref;

  return (
    <>
      <Editor
        id={`rich-text-editor-${label}`}
        apiKey={TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          if (editorRef) editorRef.current = editor;
        }}
        initialValue={initialValue}
        height={height}
        value={value}
        onEditorChange={onChange}
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
            'undo redo  bold italic strikethrough underline  blocks forecolor fontsize  alignleft aligncenter alignright alignjustify  bullist numlist  custom-image table blockquote codesample',
          toolbar_mode: 'sliding',
          toolbar_persist: true,
          setup: (editor) => {
            editor.ui.registry.addButton('custom-image', {
              icon: 'image',
              onAction: () =>
                editor.windowManager.open(dialogConfig(editor, onAssetUpload))
            });
          },
          statusbar: false,
          placeholder
          // content_css:
          //   'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/content/bifrost-theme/content.min.css',
          // skin_url:
          //   'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/ui/bifrost-theme'
        }}
      />
    </>
  );
});

export default TextEditor;
