import { useContext, useState } from 'react';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/context/SectionsDataContext';

export default function useFilterModal({ onSubmit }) {
  const { urls, componentIds, categories, buildFilters, onCloseClick } =
    useContext(SectionsDataContext);
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
  const [showNeedsReviewIssues, setShowNeedsReviewIssues] = useState(false);

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
      finalList = [...selectedImpact, option];
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
      category: selectedCategory
    };
    onCloseClick();
    onSubmit(intermediateFilters);
    // dispatch(setReportFilters(intermediateFilters));
    // dispatch(resetIssueItem());
    // const path = deleteUrlQueryParam([
    //   'activeViolationId',
    //   'activeComponentId',
    //   'activeIssueIndex',
    //   'isShowingIssue'
    // ]);
    // navigate(`?${path}`);

    // // update query params with applied filters
    // const filterValues = {};
    // Object.entries(intermediateFilters).forEach(([key, values]) => {
    //   if (key !== 'showNeedsReviewIssues' && values.length > 0) {
    //     filterValues[key] = values.map(({ value }) => value);
    //   }
    // });
    // const updatedPath = updateUrlWithQueryParam(filterValues);
    // navigate(`?${updatedPath}`);
    // setIsOpen(false);
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
    setPageValue,
    setCategoryValue,
    setComponentValue,
    onNeedsReviewChecked,
    onInputBoxChange,
    onApplyFilters,
    onUpdateFilters
  };
}
