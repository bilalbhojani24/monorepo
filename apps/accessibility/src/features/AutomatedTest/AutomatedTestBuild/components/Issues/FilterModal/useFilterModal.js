import { useContext, useState } from 'react';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/context/SectionsDataContext';

export default function useFilterModal() {
  const {
    urls,
    componentIds,
    categories,
    buildFilters,
    onCloseClick,
    onApplyFilters: onSubmit
  } = useContext(SectionsDataContext);
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
    }
  };

  const onInputBoxChange = (option, event) => {
    const { checked } = event.target;

    let finalList;
    if (checked) {
      finalList = [...selectedImpact, option.value];
    } else {
      finalList = [...selectedImpact.filter((value) => value !== option.value)];
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
      showNeedsReviewIssues
    };
    onCloseClick();
    onSubmit(intermediateFilters);
  };

  return {
    urls,
    componentIds,
    categories,
    selectedPages,
    selectedComponent,
    selectedCategory,
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
