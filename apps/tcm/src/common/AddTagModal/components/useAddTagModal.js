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
    verifierFunction(enteredTag).then((data) => {
      if (data) {
        setNewTags([...newTags, enteredTag]);
        setAllTags([...allTags, enteredTag]);
        setTagEntered('');
      } else setDuplicateTag([...duplicateTags, enteredTag]);
    });
  };

  const onTagRemoveClick = () => {};

  const onCloseHandler = () => {
    hideAddTagsModal(newTags);
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
