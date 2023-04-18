import React from 'react';
import { Hyperlink, InputField } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const Field = ({
  type,
  value,
  label,
  docLink = null,
  fieldKey,
  placeholder,
  setDataForField
}) => {
  const handleChange = (event) => {
    setDataForField(fieldKey, event.target.value);
  };
  return (
    <>
      <div className={` ${docLink ? 'mb-2' : 'mb-5'}`}>
        <InputField
          label={label}
          value={value}
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
      {docLink && (
        <Hyperlink
          wrapperClassName="text-sm font-normal leading-5 mb-5"
          href={docLink.href}
          target="_blank"
          rel="noopener noreferrer"
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
