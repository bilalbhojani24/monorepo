import { useSelector } from 'react-redux';

const useAddEditTestCaseCustomField = () => {
  const customFieldData = useSelector(
    (state) => state.repository.customFieldData
  );

  return { customFields: customFieldData?.fields || [] };
};

export default useAddEditTestCaseCustomField;
