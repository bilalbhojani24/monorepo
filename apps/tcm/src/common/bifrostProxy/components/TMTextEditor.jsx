/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { TextEditor } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMTextEditor = (props) => {
  const { initialValue, onChange, value } = props;
  const [hasChanged, setHasChanged] = useState(false);

  const onChangeHandler = (data) => {
    if (!hasChanged) setHasChanged(true);
    onChange(data);
  };

  const properties = {
    ...props
  };

  return (
    <TextEditor
      {...properties}
      value={value}
      // initialValue={!hasChanged ? initialValue : null}
      onChange={onChangeHandler}
    />
  );
};

TMTextEditor.propTypes = {};

TMTextEditor.defaultProps = {};

export default TMTextEditor;
