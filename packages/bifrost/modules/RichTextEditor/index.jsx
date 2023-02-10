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
  onAssetUpload,
  height,
  label,
  width,
  wrapperClassName,
  onChange,
  value,
  initialValue,
  editorRef,
  placeholder
}) => (
  <div className={twClassNames(wrapperClassName)}>
    {label ? (
      <label
        htmlFor={`rich-text-editor-${label}`}
        className="text-base-700 mb-1 block text-sm font-medium"
      >
        {label}
      </label>
    ) : null}
    <Editor
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
  onAssetUpload: func.isRequired,
  initialValue: string,
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
  height: 500,
  label: null,
  placeholder: 'Type something...',
  value: undefined,
  width: '100%',
  wrapperClassName: '',
  editorRef: null
};

export default RichTextEditor;
