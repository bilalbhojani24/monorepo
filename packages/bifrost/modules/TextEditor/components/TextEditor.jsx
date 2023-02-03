/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = () => {
  const editorRef = useRef(null);

  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent({ format: 'text' }));
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  return (
    <>
      <Editor
        apiKey="93wwi5nts6xoefzltfebudmklr0b6iedyvrg115pnula0wkd"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
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
            // optional
            'searchreplace',
            'media',
            'charmap',
            'fullscreen',
            'insertdatetime',
            'wordcount',
            'preview'
          ],
          toolbar:
            'undo redo | bold italic strikethrough underline | blocks forecolor fontsize | alignleft aligncenter alignright alignjustify | bullist numlist  | image table blockquote codesample',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          statusbar: false,
          content_css:
            'http://127.0.0.1:5500/packages/bifrost/modules/TextEditor/bifrost-theme/skins/content/bifrost-theme/content.min.css',
          skin_url:
            'http://127.0.0.1:5500/packages/bifrost/modules/TextEditor/bifrost-theme/skins/ui/bifrost-theme'
        }}
      />
    </>
  );
};

export default TextEditor;
