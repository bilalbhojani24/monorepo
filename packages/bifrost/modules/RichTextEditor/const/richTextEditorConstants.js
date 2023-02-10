export const TINYMCE_API_KEY =
  '93wwi5nts6xoefzltfebudmklr0b6iedyvrg115pnula0wkd';

export const dialogConfig = (editor, onAssetUpload) => ({
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
  initialData: {
    catdata: 'initial Cat',
    isdog: false
  },
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
        api.redial({
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
        });
      }
    } catch (error) {
      api.unblock();
      api.redial({
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
      });
    }
  }
});
