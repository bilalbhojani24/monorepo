import { selectMenuValueMapper } from 'utils/helperFunctions';

export const formDataRetriever = (tagsArray, formData) => {
  const hasTagsButNoMeta = tagsArray.length === 0 && formData?.tags;
  const customFields = {};

  formData?.custom_fields?.forEach((item) => {
    customFields[item.id] = item.value;
  });

  return {
    ...formData,
    tags: hasTagsButNoMeta
      ? formData?.tags
      : tagsArray.filter((item) => formData?.tags.includes(item.value)),
    issues: selectMenuValueMapper(
      formData?.issues?.map((item) => item.jira_id)
    ),
    custom_fields: customFields
  };
};

export const mapFolderAncestorHelper = (ancestorsArray, folderId) => {
  let newContentObject = null;
  ancestorsArray?.forEach((item, iDx) => {
    const newItem = item;
    newItem.isOpened = true;
    if (iDx === 0) {
      // root folder
      newItem.contents = newItem.contents.map((thisItem) =>
        thisItem.id === parseInt(folderId, 10)
          ? { ...thisItem, isSelected: true }
          : thisItem
      );
    } else {
      newItem.contents = item.contents
        ? item.contents.map((internalItem) =>
            internalItem.id === newContentObject?.id
              ? newContentObject
              : internalItem
          )
        : newContentObject;
    }
    newItem.sub_folders_count = newItem?.contents?.length;
    newContentObject = newItem;
  });
  return newContentObject;
};
