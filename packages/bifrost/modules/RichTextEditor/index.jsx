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
      onAssetUpload={onAssetUpload}
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

RichTextEditor.propTypes = {
  onAssetUpload: func.isRequired,
  initialValue: string,
  onChange: func,
  height: oneOfType([number, string]),
  placeholder: string,
  value: string,
  width: oneOfType([number, string]),
  wrapperClass: string,
  editorRef: shape({ current: instanceOf(Element) })
};

RichTextEditor.defaultProps = {
  initialValue: undefined,
  onChange: undefined,
  height: 500,
  placeholder: 'Type something...',
  value: undefined,
  width: '100%',
  wrapperClass: '',
  editorRef: null
};

export default RichTextEditor;
