import React from 'react';
import PropTypes from 'prop-types';

import SingleDynamicSelect from './SingleDynamicSelect';
import SingleFixedSelect from './SingleFixedSelect';

const SingleValueSelect = ({
  label,
  // schema,
  options,
  fieldKey,
  required,
  searchPath,
  fieldsData,
  optionsPath,
  placeholder,
  // description,
  // defaultValue,
  setFieldsData,
  wrapperClassName
}) => {
  const isDynamicSelect = Boolean(optionsPath || searchPath);

  return isDynamicSelect ? (
    <SingleDynamicSelect
      label={label}
      fieldKey={fieldKey}
      required={required}
      searchPath={searchPath}
      optionsPath={optionsPath}
      fieldsData={fieldsData}
      placeholder={placeholder}
      setFieldsData={setFieldsData}
      wrapperClassName={wrapperClassName}
    />
  ) : (
    <SingleFixedSelect
      label={label}
      options={options}
      fieldKey={fieldKey}
      required={required}
      fieldsData={fieldsData}
      placeholder={placeholder}
      setFieldsData={setFieldsData}
      wrapperClassName={wrapperClassName}
    />
  );
};

SingleValueSelect.propTypes = {
  fieldsData: PropTypes.string.isRequired,
  setFieldsData: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  searchUrl: PropTypes.string,
  optionsUrl: PropTypes.string
};

SingleValueSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: '',
  searchUrl: null,
  optionsUrl: null
};

export default SingleValueSelect;
