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

export const imageDialogConfig = (editor, onAssetUpload) => ({
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

      if (typeof res === 'string' && res.length) {
        editor.execCommand('mceInsertContent', false, `<img src=${res} />`);
        api.unblock();
        api.close();
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
