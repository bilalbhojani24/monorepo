function getFileExtension(file) {
  const fileName = file.name;
  const parts = fileName.split('.');
  return parts[parts.length - 1];
}

export const imageDialogConfig = (
  editor,
  onAssetUpload,
  containerId,
  allowedFormats,
  isError = false,
  errorMessage = 'Something went wrong...'
) => {
  const bodyObj = {
    type: 'panel',
    items: [
      {
        type: 'dropzone',
        name: 'dropzone',
        label: ''
      },
      ...Object.values({
        ...(isError && [
          {
            type: 'alertbanner',
            level: 'error',
            text: errorMessage,
            icon: 'question'
          }
        ])
      })
    ]
  };

  return {
    title: 'Image',
    body: bodyObj,
    buttons: [],
    onChange: async (api) => {
      const fileType = getFileExtension(api.getData().dropzone[0]);

      if (!allowedFormats.includes(fileType)) {
        api.unblock();
        api.redial(
          imageDialogConfig(
            editor,
            onAssetUpload,
            containerId,
            allowedFormats,
            true,
            `Unsupported file type ${fileType}`
          )
        );
      } else {
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
            api.redial(
              imageDialogConfig(
                editor,
                onAssetUpload,
                containerId,
                allowedFormats,
                true
              )
            );
          }
        } catch (error) {
          api.unblock();
          api.redial(
            imageDialogConfig(
              editor,
              onAssetUpload,
              containerId,
              allowedFormats,
              true
            )
          );
        }
      }
    }
  };
};
