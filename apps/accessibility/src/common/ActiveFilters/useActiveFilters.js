import { useContext } from 'react';

export default function useActiveFilters(sectionsDataContext) {
  const {
    activeSwitch,
    hasFilters,
    onTabSelect,
    onFilterButtonClick,
    onHiddenIssueClick,
    onUpdateImpact,
    showHiddenIssues,
    onTagClose,
    buildFilters
  } = useContext(sectionsDataContext);

  return {
    showHiddenIssues,
    activeSwitch,
    hasFilters,
    buildFilters,
    onFilterButtonClick,
    onTabSelect,
    onHiddenIssueClick,
    onTagClose,
    onUpdateImpact
  };
}
