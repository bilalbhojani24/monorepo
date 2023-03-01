import React from 'react';
import { Hyperlink, InputField } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const Field = ({
  label,
  docLink = null,
  type,
  fieldKey,
  setDataForField,
  value,
  placeholder
}) => {
  const handleChange = (event) => {
    setDataForField(fieldKey, event.target.value);
  };
  return (
    <>
      <InputField
        wrapperClassName={`shadow-none ${docLink ? 'pb-2' : 'pb-5'}`}
        label={label}
        value={value}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {docLink && (
        <Hyperlink
          wrapperClassName="text-sm font-normal leading-5 pb-5"
          href={docLink.href}
        >
          {docLink.text}
        </Hyperlink>
      )}
    </>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  docLink: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }),
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  setDataForField: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

Field.defaultProps = {
  docLink: null,
  placeholder: ''
};

export default Field;
