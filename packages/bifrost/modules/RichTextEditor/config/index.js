const imageErrorView = {
  title: 'Image',
  body: {
    type: 'panel',
    items: [
      {
        type: 'dropzone',
        name: 'dropzone',
        label: ''
      },
      {
        type: 'alertbanner',
        level: 'error',
        text: 'Something went wrong...',
        icon: 'question'
      }
    ]
  },
  buttons: []
};

export const imageDialogConfig = (editor, onAssetUpload, containerId) => ({
  title: 'Image',
  body: {
    type: 'panel',
    items: [
      {
        type: 'dropzone',
        name: 'dropzone',
        label: ''
      }
    ]
  },
  buttons: [],
  onChange: async (api) => {
    api.block('Uploading image...');

    try {
      const res = await onAssetUpload(api.getData().dropzone);

      if (res) {
        const imgTag = `<img ${Object.entries(res)
          .map(([attr, value]) => `${attr}="${value}"`)
          .join(' ')} />`;
        editor.execCommand('mceInsertContent', false, imgTag);
        api.unblock();
        api.close();
        document
          .getElementById(containerId)
          .classList.remove('rich-text-editor-image-modal-open');
        editor.execCommand('toggletoolbardrawer');
      } else {
        api.unblock();
        api.redial(imageErrorView);
      }
    } catch (error) {
      api.unblock();
      api.redial(imageErrorView);
    }
  }
});
