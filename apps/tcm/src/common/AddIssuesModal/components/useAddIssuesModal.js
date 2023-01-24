import { useEffect, useState } from 'react';

const useAddIssuesModal = ({
  isVisible,
  onClose,
  verifierFunction,
  existingTags
}) => {
  const [allTags, setAllTags] = useState(existingTags);
  const [newTags, setNewTags] = useState([]);
  const [enteredTag, setTagEntered] = useState('');
  const [errorText, setErrorText] = useState(null);

  const addTagHandler = () => {
    setErrorText(null);
    const tagsSplitted = enteredTag
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    verifierFunction(tagsSplitted).then((data) => {
      if (data) {
        setNewTags(data?.tags);
        setAllTags([...allTags, ...data?.tags]);
        setTagEntered(data?.error_tags.join(', '));
        setErrorText('A tag with the same name already exists');
      }
    });
  };

  const onTagRemoveClick = (tag) => {
    setAllTags(allTags.filter((item) => item !== tag));
    setNewTags(newTags.filter((item) => item !== tag));
  };

  const onCloseHandler = () => {
    onClose(allTags, newTags);
  };

  useEffect(() => {
    // check duplicates on change
    //   const tagsSplitted = enteredTag.split(',').map((item) => item.trim());
    //   setErrorText(
    //     allTags.filter((element) => tagsSplitted.includes(element)).length
    //       ? 'test'
    //       : null,
    //   );
    if (errorText) setErrorText(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredTag]);

  useEffect(() => {
    if (isVisible) {
      setNewTags([]);
      setAllTags(existingTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return {
    allTags,
    enteredTag,
    errorText,
    setTagEntered,
    addTagHandler,
    onTagRemoveClick,
    onCloseHandler
  };
};
export default useAddIssuesModal;
