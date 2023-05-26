import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { activeInitFilters, events, GUIDELINES } from 'constants';
import {
  resetFilters,
  resetIssueItem,
  setActiveComponentId,
  setActiveIssueIndex,
  setActiveSwitch,
  setActiveViolationId,
  setIsFilterModalVisible,
  setIsShowingIssue,
  setResetFilterKey,
  setShowHiddenIssues,
  setTestFilters,
  setTestFiltersKey
} from 'features/AutomatedTest/AutomatedTestBuild/components/TestIssues/slices/appSlice';
import {
  getActiveComponentId,
  getActiveComponentNodes,
  getActiveIssueIndex,
  getActiveSwitch,
  getActiveViolation,
  getActiveViolationId,
  getCustomData,
  getIsFilterModalVisible,
  getIsShowingIssue,
  getIssueItem,
  getShowHiddenIssuesState,
  getTestData,
  getTestFilters,
  getTestMetaData,
  getUniqFilterValues
} from 'features/AutomatedTest/AutomatedTestBuild/components/TestIssues/slices/selector';
// import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';
// import { logEvent } from 'utils/logEvent';

export default function useIssues() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const activeComponentId = useSelector(getActiveComponentId);
  const isShowingIssue = useSelector(getIsShowingIssue);
  const isFilterModalVisible = useSelector(getIsFilterModalVisible);
  const testFilters = useSelector(getTestFilters);
  const activeSwitch = useSelector(getActiveSwitch);
  const { urls, componentIds, categories, tests } =
    useSelector(getUniqFilterValues);
  const testData = useSelector(getTestData);
  const customData = useSelector(getCustomData);
  const activeTestFilters = useSelector(getTestFilters);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);
  const testMetaData = useSelector(getTestMetaData);
  const issueNode = useSelector(getIssueItem);
  const activeNodes = useSelector(getActiveComponentNodes);
  const activeViolationId = useSelector(getActiveViolationId);
  const activeIssueSection = useSelector(getActiveViolation);
  const activeIssueIndex = useSelector(getActiveIssueIndex);
  const params = new URLSearchParams(window.location.search);
  const wcagVersion = params.get('wcagVersion');

  const [sectionData, setSectionData] = useState(null);
  const [filteredTestData, setFilteredTestData] = useState(testData);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  let activeIssueItem = null;
  let activeViolationItem = null;
  let activeSectionNodes = null;

  const isGuidelineMode = activeSwitch === GUIDELINES;
  if (isGuidelineMode && sectionData && activeViolationId) {
    activeViolationItem = sectionData.find(
      ({ violation }) => violation.id === activeViolationId
    )?.violation;
    if (showHiddenIssues) {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ hidden }) => hidden)
      };
    } else {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ confirmed }) =>
          activeTestFilters.showNeedsReviewIssues
            ? confirmed === null
            : confirmed || confirmed === null
        )
      };
    }
    activeIssueItem = activeViolationItem.nodes.filter(
      ({ componentId }) => componentId === activeComponentId
    )[activeIssueIndex];
    activeSectionNodes = activeViolationItem.nodes.filter(
      (node) => node.componentId === activeComponentId
    );
  }

  const issueItem = isGuidelineMode ? activeIssueItem : issueNode;
  const activeViolation = isGuidelineMode
    ? activeViolationItem
    : activeIssueSection;
  let activeComponentNodes = isGuidelineMode ? activeSectionNodes : activeNodes;

  // NOTE: Node filter logic for the right panel
  if (activeTestFilters.page.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeTestFilters.page.map(({ value }) => value).includes(node.page.url)
    );
  }
  if (activeTestFilters.component.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeTestFilters.component
        .map(({ value }) => value)
        .includes(node.componentId)
    );
  }

  const headerData = {
    tags: isGuidelineMode
      ? isShowingIssue &&
        activeViolation.tags.filter((tag) => tag === activeViolation.id)
      : isShowingIssue && activeViolation.tags,
    help: isShowingIssue && activeViolation.help,
    description: isShowingIssue && activeViolation.description
  };

  const maxLimit = activeComponentNodes && activeComponentNodes.length - 1;

  useEffect(() => {
    let filteredViolations = testData.map((violation) => ({
      ...violation,
      nodes: violation.nodes.filter(
        ({ confirmed }) => confirmed === null || confirmed
      )
    }));
    if (showHiddenIssues) {
      filteredViolations = testData.map((violation) => {
        const filteredNodes = [];

        violation.nodes.forEach((node) => {
          node.childNodes.forEach((item) => {
            if (item.hidden) {
              filteredNodes.push(node);
            }
          });
        });

        return {
          ...violation,
          nodes: filteredNodes
        };
      });
    }
    if (activeTestFilters.showNeedsReviewIssues) {
      filteredViolations = testData.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ confirmed }) => confirmed === null)
      }));
    }
    if (activeTestFilters.impact.length) {
      const appliedSeverityFilter = activeTestFilters.impact.map(
        ({ value }) => value
      );
      filteredViolations = testData.filter((violation) =>
        appliedSeverityFilter.includes(violation.impact)
      );
    }
    if (activeTestFilters.category.length) {
      filteredViolations = filteredViolations.filter(({ tags }) => {
        const category = tags
          .find((tag) => tag.includes('cat.'))
          ?.split('cat.')[1];
        return activeTestFilters.category
          .map(({ value }) => value)
          .includes(category);
      });
    }
    if (activeTestFilters.page.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ page }) =>
          activeTestFilters.page.map(({ value }) => value).includes(page.url)
        )
      }));
    }
    if (activeTestFilters.component.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ componentId }) =>
          activeTestFilters.component
            .map(({ value }) => value)
            .includes(componentId)
        )
      }));
    }
    setFilteredTestData(filteredViolations);
  }, [activeTestFilters, testData, showHiddenIssues]);

  useEffect(() => {
    if (filteredTestData && customData) {
      const uniqTags = [];
      const finalTags = [];
      filteredTestData.forEach((violation) => {
        violation.tags.forEach((tag) => {
          if (!finalTags.includes(tag)) {
            finalTags.push(tag);
          }
        });
      });
      filteredTestData.forEach((violation) => {
        const { nodes, tags } = violation;
        const filteredTags = violation.tags.filter(
          (tag) =>
            !tag.includes('cat') &&
            tag.includes('wcag') &&
            !tag.includes('wcag21a') &&
            !tag.includes('wcag2a')
        );
        filteredTags.forEach((tag) => {
          const isTagExists = uniqTags.find(
            ({ violation: { id } }) => id === tag
          );
          if (!isTagExists) {
            uniqTags.push({
              value: customData[tag].value,
              violation: {
                id: tag,
                value: customData[tag].value,
                help: `${customData[tag].value} ${customData[tag].name}`,
                name: customData[tag].name,
                description: customData[tag].description,
                tags,
                impact: '',
                nodes
              }
            });
          } else {
            uniqTags.forEach((section) => {
              if (section.violation.id === tag) {
                section.violation.nodes = [
                  ...section.violation.nodes,
                  ...nodes
                ];
              }
            });
          }
        });
      });
      const sortedTagVersion = uniqTags
        .map((a) =>
          a.value
            .split('.')
            .map((n) => +n + 100000)
            .join('.')
        )
        .sort()
        .map((a) =>
          a
            .split('.')
            .map((n) => +n - 100000)
            .join('.')
        );
      // Map tags to sorted version
      setSectionData(
        sortedTagVersion.map((version) =>
          uniqTags.find((tag) => tag.value === version)
        )
      );
    }
  }, [filteredTestData, customData]);

  const generateData = () =>
    filteredTestData.map((violation) => {
      const totalCount = violation.nodes.length;
      return {
        violation,
        id: violation.id,
        title: `${violation.help} (${totalCount})`
      };
    });

  const onFilterButtonClick = () => {
    dispatch(setIsFilterModalVisible(true));
  };

  const onRowClick = (key, violationId) => {
    dispatch(setActiveViolationId(violationId));
    dispatch(setActiveComponentId(key));
    dispatch(setIsShowingIssue(true));
    // const path = updateUrlWithQueryParam({
    //   activeViolationId: violationId,
    //   activeComponentId: key,
    //   isShowingIssue: true,
    //   activeIssueIndex: 0
    // });
    // navigate(`?${path}`);
  };

  const onCloseClick = () => {
    dispatch(setIsFilterModalVisible(false));
  };

  const onUpdateImpact = (values) => {
    dispatch(
      setTestFiltersKey({
        key: 'impact',
        values
      })
    );
    dispatch(resetIssueItem());
    // const path = deleteUrlQueryParam([
    //   'activeViolationId',
    //   'activeComponentId',
    //   'activeIssueIndex',
    //   'isShowingIssue'
    // ]);
    // navigate(`?${path}`);
    // const updatedPath = updateUrlWithQueryParam({
    //   impact: values.map(({ value }) => value)
    // });
    // navigate(`?${updatedPath}`);
  };

  const onApplyFilters = (intermediateFilters) => {
    dispatch(setTestFilters(intermediateFilters));
    dispatch(resetIssueItem());
    // const path = deleteUrlQueryParam([
    //   'activeViolationId',
    //   'activeComponentId',
    //   'activeIssueIndex',
    //   'isShowingIssue'
    // ]);
    // navigate(`?${path}`);

    // update query params with applied filters
    const filterValues = {};
    Object.entries(intermediateFilters).forEach(([key, values]) => {
      if (key !== 'showNeedsReviewIssues' && values.length > 0) {
        filterValues[key] = values.map(({ value }) => value);
      }
    });
    // const updatedPath = updateUrlWithQueryParam(filterValues);
    // navigate(`?${updatedPath}`);
  };

  const onNextClick = () => {
    if (activeIssueIndex < maxLimit) {
      const newIndex = activeIssueIndex + 1;
      dispatch(setActiveIssueIndex(newIndex));
      // const path = updateUrlWithQueryParam({ activeIssueIndex: newIndex });
      // navigate(`?${path}`);
    }
  };

  const onPreviousClick = () => {
    if (activeIssueIndex > 0) {
      const newIndex = activeIssueIndex - 1;
      dispatch(setActiveIssueIndex(newIndex));
      // const path = updateUrlWithQueryParam({ activeIssueIndex: newIndex });
      // navigate(`?${path}`);
    }
  };

  const onIssueCloseClick = () => {
    dispatch(setIsShowingIssue(false));
    // const path = updateUrlWithQueryParam({
    //   activeIssueIndex: 0,
    //   isShowingIssue: false
    // });
    // navigate(`?${path}`);
  };

  const onTagClose = (key) => {
    if (key === 'all') {
      dispatch(resetFilters());
      // const path = deleteUrlQueryParam(Object.keys(activeInitFilters));
      // navigate(`?${path}`);
    } else if (key === 'showNeedsReviewIssues') {
      // const path = deleteUrlQueryParam(['showNeedsReviewIssues']);
      // navigate(`?${path}`);
      dispatch(setResetFilterKey({ key, value: false }));
    } else {
      // const path = deleteUrlQueryParam([key]);
      // navigate(`?${path}`);
      dispatch(setResetFilterKey({ key, value: [] }));
    }
  };

  const onTabSelect = (tabValue) => {
    dispatch(setActiveSwitch(tabValue));
    // logEvent('OnADReportView', {
    //   actionType: events.allIssuesTab,
    //   tab: tabValue
    // });
    // const path = updateUrlWithQueryParam({
    //   activeSwitch: tabValue,
    //   activeViolationId: '',
    //   activeComponentId: '',
    //   activeIssueIndex: 0,
    //   isShowingIssue: false
    // });
    // navigate(`?${path}`);
  };

  const onHiddenIssueClick = (val) => {
    // const path = updateUrlWithQueryParam({ hideIssues: val });
    // navigate(`?${path}`);
    dispatch(resetIssueItem());
    dispatch(setShowHiddenIssues({ hideIssues: val }));
  };

  const onSliderOpenClick = () => {
    setIsSliderOpen(true);
  };

  return {
    urls,
    isSliderOpen,
    componentIds,
    categories,
    activeComponentId,
    isShowingIssue,
    isFilterModalVisible,
    testFilters,
    sectionData,
    showHiddenIssues,
    isGuidelineMode,
    activeIssueIndex,
    activeSwitch,
    testMetaData,
    issueNode,
    headerData,
    issueItem,
    activeComponentNodes,
    activeNodes,
    activeViolation,
    activeViolationId,
    activeIssueSection,
    activeTestFilters,
    wcagVersion,
    tests,
    onSliderOpenClick,
    onTagClose,
    onTabSelect,
    onHiddenIssueClick,
    onRowClick,
    onNextClick,
    onPreviousClick,
    onIssueCloseClick,
    onApplyFilters,
    onUpdateImpact,
    onFilterButtonClick,
    generateData,
    onCloseClick
  };
}
