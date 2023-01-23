import { useEffect, useState } from 'react';

const useAddTagModal = ({
  isVisible,
  hideAddTagsModal,
  verifierFunction,
  existingTags,
}) => {
  const [allTags, setAllTags] = useState(existingTags);
  const [newTags, setNewTags] = useState([]);
  const [enteredTag, setTagEntered] = useState('');
  const [duplicateTags, setDuplicateTag] = useState(existingTags);

  const addTagHandler = () => {
    const tagsSplitted = enteredTag.split(',').map((item) => item.trim());

    verifierFunction(tagsSplitted).then((data) => {
      if (data) {
        setNewTags([...newTags, ...tagsSplitted]);
        setAllTags([...allTags, ...tagsSplitted]);
        setTagEntered('');
      } else setDuplicateTag([...duplicateTags, ...tagsSplitted]);
    });
  };

  const onTagRemoveClick = (tag) => {
    setAllTags(allTags.filter((item) => item !== tag));
    setNewTags(newTags.filter((item) => item !== tag));
  };

  const onCloseHandler = () => {
    hideAddTagsModal(allTags);
  };

  useEffect(() => {
    if (isVisible) {
      setNewTags([]);
      setAllTags(existingTags);
      setDuplicateTag(existingTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    allTags,
    enteredTag,
    duplicateTags,
    setTagEntered,
    addTagHandler,
    onTagRemoveClick,
    onCloseHandler,
  };
};
export default useAddTagModal;
