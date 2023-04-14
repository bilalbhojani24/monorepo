import React, { useState } from 'react';
import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  TextArea
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import TextAreaField from '../TextArea';
import { FieldType } from '../types';

const Paragraph = ({
  label,
  value,
  schema,
  fieldKey,
  required,
  fieldsData,
  fieldErrors,
  placeholder,
  defaultValue,
  setFieldsData,
  hideDescription,
  descriptionMeta
}) => {
  const [shouldShowMetaSection, setShouldShowMetaSection] = useState(false);
  const toggleMetaSectionVisibility = () => {
    setShouldShowMetaSection(!shouldShowMetaSection);
  };
  const isDescription = fieldKey === 'description';
  const isComment = fieldKey === 'comment';

  return (isDescription && !hideDescription) || !isDescription ? (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
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
            wrapperClassName="border-0 shadow-none focus:ring-0 focus:ring-offset-0 px-0 text-base-500 text-sm"
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
            <TextArea disabled value={descriptionMeta} />
          )}
        </>
      )}
    </div>
  ) : null;
};

Paragraph.propTypes = {
  ...FieldType,
  descriptionMeta: PropTypes.string,
  hideDescription: PropTypes.bool
};

Paragraph.defaultProps = {
  descriptionMeta: '',
  hideDescription: false
};

export default Paragraph;