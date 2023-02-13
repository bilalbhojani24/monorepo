import { useEffect, useState } from 'react';
import { splitStringToArray } from 'utils/helperFunctions';

const useAddTagModal = ({
  isVisible,
  onClose,
  verifierFunction,
  existingTags
}) => {
  const [allTags, setAllTags] = useState(existingTags);
  const [newTags, setNewTags] = useState([]);
  const [enteredTag, setTagEntered] = useState('');
  const [errorText, setErrorText] = useState(null);

  const isLocalDuplicateExists = (tagsSplitted) =>
    tagsSplitted.find((item) => allTags.includes(item));

  const addTagHandler = () => {
    setErrorText(null);
    const tagsSplitted = splitStringToArray(enteredTag, ',');

    if (!isLocalDuplicateExists(tagsSplitted)) {
      verifierFunction(tagsSplitted).then((data) => {
        if (data) {
          if (data?.tags) {
            setNewTags([...newTags, ...data?.tags]);
            setAllTags([...new Set([...allTags, ...data?.tags])]);
          }
          setTagEntered(data?.error_tags?.join(', ') || '');
        }

        if (data?.error_tags?.length)
          setErrorText('A tag with the same name already exists. Search & select this tag from tags drop down.');
      });
    } else setErrorText('A tag with the same name already exists. Search & select this tag from tags drop down.');
  };

  const onTagRemoveClick = (tag) => {
    setAllTags(allTags.filter((item) => item !== tag));
    setNewTags(newTags.filter((item) => item !== tag));
  };

  const onCloseHandler = () => {
    onClose(allTags, newTags);
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
    onCloseHandler,
    setErrorText
  };
};
export default useAddTagModal;
