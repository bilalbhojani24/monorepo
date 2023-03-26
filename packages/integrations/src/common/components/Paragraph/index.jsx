import React, { useState } from 'react';
import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  TextArea
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import TextAreaField from '../TextArea';

const Paragraph = ({
  key,
  label,
  value,
  fieldKey,
  required,
  metaData,
  fieldsData,
  fieldErrors,
  placeholder,
  defaultValue,
  setFieldsData,
  hideDescription
}) => {
  const [shouldShowMetaSection, setShouldShowMetaSection] = useState(false);
  const toggleMetaSectionVisibility = () => {
    setShouldShowMetaSection(!shouldShowMetaSection);
  };
  const isDescription = fieldKey === 'description';
  const isComment = fieldKey === 'comment';

  return (isDescription && !hideDescription) || !isDescription ? (
    <div className="py-3">
      <TextAreaField
        label={label}
        value={value}
        fieldKey={fieldKey}
        required={required}
        fieldsData={fieldsData}
        fieldErrors={fieldErrors}
        placeholder={placeholder}
        defaultValue={defaultValue}
        setFieldsData={setFieldsData}
      />
      {(isDescription || isComment) && (
        <>
          <Button
            variant="minimal"
            wrapperClassName="border-0 shadow-none focus:ring-0 px-0 text-base-500 text-sm"
            icon={
              shouldShowMetaSection ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            iconPlacement="end"
            onClick={toggleMetaSectionVisibility}
          >
            {shouldShowMetaSection
              ? `Collapse meta data added ${
                  isDescription ? 'with description' : 'in the comment'
                }`
              : `Additional meta data added ${
                  isDescription ? 'with description' : 'in the comment'
                }`}
          </Button>
          {shouldShowMetaSection && (
            <TextArea disabled value={metaData.description} />
          )}
        </>
      )}
    </div>
  ) : null;
};

Paragraph.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

Paragraph.defaultProps = {
  placeholder: null
};

export default Paragraph;
