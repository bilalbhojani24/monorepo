import { selectMenuValueMapper } from 'utils/helperFunctions';

export const formDataRetriever = (tagsArray, formData) => ({
  ...formData,
  tags: tagsArray.filter((item) => formData?.tags.includes(item.value)),
  issues: selectMenuValueMapper(formData?.issues?.map((item) => item.jira_id))
});
