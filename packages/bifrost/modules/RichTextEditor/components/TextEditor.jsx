/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { imageDialogConfig } from '../config/index';
import { TINYMCE_API_KEY } from '../const/richTextEditorConstants';

const TextEditor = forwardRef((props, ref) => {
  const {
    id,
    onAssetUpload,
    height,
    placeholder,
    onChange,
    value,
    width,
    initialValue
  } = props;

  const editorRef = ref;

  return (
    <>
      <Editor
        id={`rich-text-editor-${id}`}
        apiKey={TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          if (editorRef) editorRef.current = editor;
        }}
        initialValue={initialValue}
        height={height}
        value={value}
        onEditorChange={onChange}
        init={{
          // height: 100,
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
            'codesample',
            'autoresize'
          ],
          toolbar:
            'bold italic strikethrough underline blocks custom-image codesample',
          toolbar_sticky: true,
          toolbar_mode: 'sliding',
          fixed_toolbar_container: '#mytoolbar',
          // auto_focus: `rich-text-editor-${label}`,

          toolbar_persist: true,
          setup: (editor) => {
            editor.ui.registry.addButton('custom-image', {
              icon: 'image',
              onAction: () =>
                editor.windowManager.open(
                  imageDialogConfig(editor, onAssetUpload)
                )
            });

            editor.on('init', (ed) => {
              const toolbarPar = ed.target.container.firstElementChild;
              const toolbar = toolbarPar.firstElementChild;
              toolbar.style.visibility = 'hidden';
            });

            editor.on('focus', (ed) => {
              const toolbarPar = ed.target.container.firstElementChild;
              const toolbar = toolbarPar.firstElementChild;
              toolbar.style.visibility = 'visible';
            });

            editor.on('blur', (ed) => {
              const toolbarPar = ed.target.container.firstElementChild;
              const toolbar = toolbarPar.firstElementChild;
              toolbar.style.visibility = 'hidden';
            });
          },
          statusbar: true,
          resize: true,
          placeholder,
          content_css:
            'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/content/TW-RTE/content.min.css',
          skin_url:
            'http://127.0.0.1:5500/packages/bifrost/utils/texteditorSkin/ui/TW-RTE'
        }}
      />
    </>
  );
});

export default TextEditor;

// 'undo redo  bold italic strikethrough underline  blocks forecolor fontsize alignleft aligncenter alignright alignjustify  bullist numlist  custom-image table blockquote codesample',
