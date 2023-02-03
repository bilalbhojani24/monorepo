import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Editor from './components/TextEditor';

import './styles.scss';

const TextEditor = () => (
  <div>
    <Editor />
  </div>
);

TextEditor.propTypes = {};
TextEditor.defaultProps = {};

export default TextEditor;
