/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RichTextEditor } from '@browserstack/bifrost';
import { imageUploadRTEHandlerAPI } from 'api/attachments.api';
import PropTypes from 'prop-types';

const TMRichTextEditor = (props) => {
  const { projectId } = props;
  const imageUploadRTEHelper = (files) =>
    imageUploadRTEHandlerAPI({ files, projectId });

  return (
    <RichTextEditor
      {...props}
      onAssetUpload={imageUploadRTEHelper}
      assetsURL={import.meta.env.DEV ? '/dist/assets/css/' : '/assets/css/'}
    />
  );
};

TMRichTextEditor.propTypes = {
  projectId: PropTypes.string
};

TMRichTextEditor.defaultProps = {
  projectId: ''
};

export default TMRichTextEditor;
