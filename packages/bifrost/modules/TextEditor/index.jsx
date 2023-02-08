import React from 'react';

import {
  func,
  instanceOf,
  number,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import { twClassNames } from '../../utils/tailwindUtils';

import Editor from './components/TextEditor';

import './styles.scss';

const TextEditor = ({
  assetUploadURL,
  height,
  width,
  wrapperClass,
  onChange,
  value,
  initialValue,
  editorRef,
  placeholder
}) => (
  <div className={twClassNames(wrapperClass)}>
    <Editor
      assetUploadURL={assetUploadURL}
      height={height}
      width={width}
      onChange={onChange}
      value={value}
      initialValue={initialValue}
      placeholder={placeholder}
      ref={editorRef}
    />
  </div>
);

TextEditor.propTypes = {
  assetUploadURL: string,
  initialValue: string,
  onChange: func,
  height: oneOfType([number, string]),
  placeholder: string,
  value: string,
  width: oneOfType([number, string]),
  wrapperClass: string,
  editorRef: shape({ current: instanceOf(Element) })
};

TextEditor.defaultProps = {
  assetUploadURL: null,
  initialValue: undefined,
  onChange: undefined,
  height: 500,
  placeholder: 'Type something...',
  value: undefined,
  width: '100%',
  wrapperClass: '',
  editorRef: null
};

export default TextEditor;
