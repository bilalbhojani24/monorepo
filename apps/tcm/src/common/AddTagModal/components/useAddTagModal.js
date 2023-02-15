import { useEffect, useState } from 'react';
import { splitStringToArray } from 'utils/helperFunctions';

const useAddTagModal = ({
  isVisible,
  onClose,
  // verifierFunction,
  selectedTags,
  existingTags
}) => {
  const [allTags, setAllTags] = useState([]);
  const [selectedTagsInternal, setSelectedTags] = useState(selectedTags);
  const [newTags, setNewTags] = useState([]);
  const [enteredTag, setTagEntered] = useState('');
  const [errorText, setErrorText] = useState(null);

  const getUniqueTags = (tagsSplitted) =>
    tagsSplitted.filter((item) => !selectedTagsInternal.includes(item));

  const addTagHandler = () => {
    setErrorText(null);
    const tagsSplitted = splitStringToArray(enteredTag, ',');

    const uniqueTags = getUniqueTags(tagsSplitted);
    setNewTags([...newTags, ...uniqueTags]);
    setSelectedTags([...selectedTagsInternal, ...uniqueTags]);
    setAllTags([...new Set([...allTags, ...uniqueTags])]);
    setTagEntered('');
    // if (!duplicateTags(tagsSplitted)) {
    //   verifierFunction(tagsSplitted).then((data) => {
    //     if (data) {
    //       if (data?.tags) {
    //         setNewTags([...newTags, ...data?.tags]);
    //         setAllTags([...new Set([...allTags, ...data?.tags])]);
    //       }
    //       setTagEntered(data?.error_tags?.join(', ') || '');
    //     }

    //     if (data?.error_tags?.length)
    //       setErrorText('A tag with the same name already exists');
    //   });
    // } else setErrorText('A tag with the same name already exists');
  };

  const onTagRemoveClick = (tag) => {
    setSelectedTags(selectedTagsInternal.filter((item) => item !== tag));
    setNewTags(newTags.filter((item) => item !== tag));
  };

  const onCloseHandler = () => {
    onClose(newTags, selectedTagsInternal);
  };

  // useEffect(() => {
  // check duplicates on change
  //   const tagsSplitted = enteredTag.split(',').map((item) => item.trim());
  //   setErrorText(
  //     allTags.filter((element) => tagsSplitted.includes(element)).length
  //       ? 'test'
  //       : null,
  //   );
  // if (errorText) setErrorText(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [enteredTag]);

  useEffect(() => {
    if (isVisible) {
      setNewTags([]);
      setAllTags(existingTags.map((item) => item.value));
      setSelectedTags(selectedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    allTags,
    selectedTagsInternal,
    enteredTag,
    errorText,
    setTagEntered,
    addTagHandler,
    onTagRemoveClick,
    onCloseHandler,
    setErrorText
  };
};
export default useAddTagModal;
