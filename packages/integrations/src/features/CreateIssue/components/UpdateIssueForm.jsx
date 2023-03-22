import React from 'react';

// import { URLS } from '../../../api/constants';
import { FormBuilder, SingleValueSelect } from '../../../common/components';

import { FIELD_KEYS } from './constants';

const UpdateIssueForm = ({
  fields,
  metaData,
  attachment,
  fieldsData,
  setFieldsData,
  setIsWorkInProgress
}) => {
  const handleSubmit = () => {};
  return (
    <>
      <div className="py-3">
        <SingleValueSelect
          required
          label="Issue"
          fieldsData={fieldsData}
          fieldKey={FIELD_KEYS.TICKET_ID}
          setFieldsData={setFieldsData}
          placeholder="Select with issues number, title or description"
          optionsPath="/api/pm-tools/v1/tickets?integration_key=jira&format=single-value-select"
          searchPath="/api/pm-tools/v1/tickets?integration_key=jira&format=single-value-select&query="
        />
      </div>
      <FormBuilder
        fields={fields}
        metaData={metaData}
        attachment={attachment}
        handleSubmit={handleSubmit}
        setIsWorkInProgress={setIsWorkInProgress}
      />
    </>
  );
};

export default UpdateIssueForm;
