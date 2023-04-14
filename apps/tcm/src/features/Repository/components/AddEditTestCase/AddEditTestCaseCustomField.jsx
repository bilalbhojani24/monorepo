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
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="flex flex-wrap [&>*:nth-child(odd)]:pr-2 [&>*:nth-child(even)]:pl-2">
      {customFields.map((item) => (
        <div className="mt-4 w-1/2">
          <TMInputField
            id="test-case-name"
            label={item?.field_user_name}
            placeholder={`Enter ${item?.field_user_name}`}
            value={testCaseFormData?.custom_fields?.[item?.id]}
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
