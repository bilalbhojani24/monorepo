import React from 'react';
import { TMInputField } from 'common/bifrostProxy';

import useAddEditTestCase from './useAddEditTestCase';
import useAddEditTestCaseCustomField from './useAddEditTestCaseCustomField';

const AddEditTestCaseCustomField = () => {
  const { customFields } = useAddEditTestCaseCustomField();
  const { handleTestCaseFieldChange, testCaseFormData } = useAddEditTestCase({
    isAddEditOnly: true
  });

  if (!customFields?.length) return null;

  return (
    <div className="flex gap-4">
      {customFields.map((item) => (
        <div className="mt-4 w-1/2">
          <TMInputField
            id="test-case-name"
            label={item?.field_name}
            placeholder={`Enter ${item?.field_name}`}
            value={testCaseFormData[item?.id]}
            onChange={(e) =>
              handleTestCaseFieldChange(
                item?.id,
                e.currentTarget.value,
                null,
                true
              )
            }
          />
        </div>
      ))}
    </div>
  );
};

export default AddEditTestCaseCustomField;
