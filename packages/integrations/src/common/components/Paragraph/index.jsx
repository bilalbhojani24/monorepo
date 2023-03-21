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
  fieldsData,
  setFieldsData,
  fieldKey,
  placeholder,
  required,
  label,
  metaData,
  schema: { system_type: systemType }
}) => {
  const [shouldShowMetaSection, setShouldShowMetaSection] = useState(false);
  const toggleMetaSectionVisibility = () => {
    setShouldShowMetaSection(!shouldShowMetaSection);
  };
  const isDescription = systemType === 'description';

  return (
    <>
      <TextAreaField
        fieldsData={fieldsData}
        setFieldsData={setFieldsData}
        fieldKey={fieldKey}
        placeholder={placeholder}
        required={required}
        label={label}
      />
      {isDescription && (
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
              ? 'Collapse meta data added with description'
              : 'Additional meta data added with description'}
          </Button>
          {shouldShowMetaSection && (
            <TextArea disabled value={metaData.description} />
          )}
        </>
      )}
    </>
  );
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
