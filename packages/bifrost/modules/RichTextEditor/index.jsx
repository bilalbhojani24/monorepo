import React from 'react';
import { twClassNames } from '@browserstack/utils';

import {
  func,
  instanceOf,
  number,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';

import Editor from './components/TextEditor';

import './styles.scss';

const RichTextEditor = ({
  assetsURL,
  onAssetUpload,
  height,
  label,
  width,
  wrapperClassName,
  onChange,
  value,
  initialValue,
  id,
  editorRef,
  placeholder
}) => (
  <div className={twClassNames(wrapperClassName)}>
    {label ? (
      <label
        htmlFor={`rich-text-editor-${id}`}
        className="text-base-700 mb-1 block text-sm font-medium"
      >
        {label}
      </label>
    ) : null}
    <Editor
      assetsURL={assetsURL}
      id={id}
      onAssetUpload={onAssetUpload}
      height={height}
      width={width}
      onChange={onChange}
      value={value}
      initialValue={initialValue}
      placeholder={placeholder}
      ref={editorRef}
      label={label}
    />
  </div>
);

RichTextEditor.propTypes = {
  assetsURL: string.isRequired,
  onAssetUpload: func.isRequired,
  initialValue: string,
  id: string.isRequired,
  onChange: func,
  height: oneOfType([number, string]),
  label: string,
  placeholder: string,
  value: string,
  width: oneOfType([number, string]),
  wrapperClassName: string,
  editorRef: shape({ current: instanceOf(Element) })
};

RichTextEditor.defaultProps = {
  initialValue: undefined,
  onChange: undefined,
  height: 100,
  label: null,
  placeholder: 'Type something...',
  value: undefined,
  width: '100%',
  wrapperClassName: '',
  editorRef: null
};

export default RichTextEditor;
