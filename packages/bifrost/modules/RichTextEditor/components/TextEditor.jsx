/* eslint-disable react/prop-types */
import React, { forwardRef, useRef } from 'react';
import { useOnClickOutside } from '@browserstack/hooks';
import { Editor } from '@tinymce/tinymce-react';

import { imageDialogConfig } from '../config/index';
import { TINYMCE_API_KEY } from '../const/richTextEditorConstants';

const TextEditor = forwardRef((props, ref) => {
  const containerRef = useRef();
  const {
    id,
    onAssetUpload,
    height,
    placeholder,
    onChange,
    value,
    width,
    initialValue,
    assetsURL,
  } = props;
  const containerId = `rich-text-editor-container-${id}`;
  const appliedId = `rich-text-editor-${id}`;
  const editorRef = ref;

  const hideFunc = () => {
    const toolbar = document.querySelector(
      `#${containerId} .tox-editor-header`,
    );
    toolbar.classList.remove('rte-show-toolbar');
  };

  const hideToolbar = () => {
    hideFunc();

    // Will be using this code in future
    // setTimeout(() => {
    //   if (
    //     !document
    //       .getElementById(containerId)
    //       .classList.contains('rich-text-editor-modal-open')
    //   ) {
    //     hideFunc();
    //   }
    // }, 200);
  };

  const showToolbar = () => {
    const toolbar = document.querySelector(
      `#${containerId} .tox-editor-header`,
    );
    toolbar.classList.add('rte-show-toolbar');
  };

  useOnClickOutside(containerRef, hideToolbar);

  return (
    <div id={containerId} ref={containerRef}>
      <Editor
        id={appliedId}
        apiKey={TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          if (editorRef) editorRef.current = editor;
        }}
        initialValue={initialValue}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          width,
          menubar: false,
          plugins: ['link', 'image', 'anchor', 'table', 'codesample'],
          toolbar:
            'bold italic strikethrough underline blocks custom-image codesample',
          toolbar_sticky: true,
          toolbar_mode: 'sliding',
          fixed_toolbar_container: '#mytoolbar',
          autoresize_on_init: false,
          setup: (editor) => {
            editor.ui.registry.addButton('custom-image', {
              icon: 'image',
              onAction: () => {
                // Will be using this code in future
                // document
                //   .getElementById(containerId)
                //   .classList.add('rich-text-editor-modal-open');

                editor.windowManager.open(
                  imageDialogConfig(editor, onAssetUpload, containerId),
                );
              },
            });

            editor.on('focus', () => {
              showToolbar();
            });
          },
          statusbar: true,
          resize: true,
          placeholder,
          content_css: `${assetsURL}texteditorSkin/content/TW-RTE/content.min.css`,
          skin_url: `${assetsURL}/texteditorSkin/ui/TW-RTE`,
        }}
      />
    </div>
  );
});

export default TextEditor;
