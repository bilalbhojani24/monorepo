import { useContext, useState } from 'react';

export default function useFilterModal(sectionsDataContext) {
  const {
    urls,
    componentIds,
    categories,
    tags,
    tests,
    files,
    buildFilters,
    onCloseClick,
    onApplyFilters: onSubmit
  } = useContext(sectionsDataContext);
  const [selectedImpact, setSelectedImpact] = useState(buildFilters.impact);
  const [selectedPages, setSelectedPages] = useState(buildFilters.page);
  const [pageValue, setPageValue] = useState('');
  const [selectedComponent, setSelectedComponent] = useState(
    buildFilters.component
  );
  const [componentValue, setComponentValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    buildFilters.category
  );
  const [categoryValue, setCategoryValue] = useState('');
  const [tagsValue, setTagsValue] = useState('');
  const [selectedTags, setSelectedTags] = useState(buildFilters.tags);
  const [testValue, setTestValue] = useState('');
  const [selectedTests, setSelectedTests] = useState(buildFilters.tests);
  const [fileValue, setFileValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState(buildFilters.files);
  const [showNeedsReviewIssues, setShowNeedsReviewIssues] = useState(
    buildFilters.showNeedsReviewIssues
  );

  const onUpdateFilters = (key, values) => {
    if (key === 'page') {
      setSelectedPages(values);
    } else if (key === 'component') {
      setSelectedComponent(values);
    } else if (key === 'category') {
      setSelectedCategory(values);
    } else if (key === 'tags') {
      setSelectedTags(values);
    } else if (key === 'tests') {
      setSelectedTests(values);
    } else if (key === 'files') {
      setSelectedFiles(values);
    }
  };

  const onInputBoxChange = (option, event) => {
    const { checked } = event.target;

    let finalList;
    if (checked) {
      const list = selectedImpact.map(({ value }) => value);
      if (!list.includes(option.value)) {
        finalList = [...selectedImpact, option];
      }
    } else {
      finalList = [
        ...selectedImpact.filter(({ value }) => value !== option.value)
      ];
    }

    setSelectedImpact(finalList);
  };

  const onNeedsReviewChecked = (event) => {
    const { checked } = event.target;
    setShowNeedsReviewIssues(checked);
  };

  const onApplyFilters = () => {
    const intermediateFilters = {
      impact: selectedImpact,
      page: selectedPages,
      component: selectedComponent,
      category: selectedCategory,
      tags: selectedTags,
      tests: selectedTests,
      files: selectedFiles,
      showNeedsReviewIssues
    };
    onCloseClick();
    onSubmit(intermediateFilters);
  };

  return {
    urls,
    componentIds,
    categories,
    tags,
    tests,
    files,
    tagsValue,
    selectedPages,
    selectedComponent,
    selectedCategory,
    selectedTags,
    setTagsValue,
    testValue,
    selectedTests,
    setTestValue,
    fileValue,
    setFileValue,
    selectedFiles,
    pageValue,
    categoryValue,
    componentValue,
    selectedImpact,
    showNeedsReviewIssues,
    onCloseClick,
    setPageValue,
    setCategoryValue,
    setComponentValue,
    onNeedsReviewChecked,
    onInputBoxChange,
    onApplyFilters,
    onUpdateFilters
  };
}
