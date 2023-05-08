import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ISSUE_TYPE } from 'constants';
import { setIsFilterModalVisible } from 'features/AutomatedTest/AutomatedTestBuild/slices/appSlice';
import {
  getActiveComponentId,
  getBuildData,
  getBuildFilters,
  getCustomData,
  getIsFilterModalVisible,
  getIsShowingIssue,
  getShowHiddenIssuesState,
  getUniqFilterValues
} from 'features/AutomatedTest/AutomatedTestBuild/slices/selector';

// import {
//   resetFilters,
//   resetIntermediateFilters,
//   resetIntermediateFiltersToActiveFilters,
//   resetIntermediateResetFilterKey,
//   resetIssueItem,
//   setIntermediateReportFiltersKey,
//   setOpenAccordionId,
//   // setReportFilters,
//   setReportFiltersKey,
//   setResetFilterKey,
//   setShowHiddenIssues
// } from 'features/Report/slice/appSlice';
// import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';
// import { logEvent } from 'utils/logEvent';

// import SectionsDataContext from '../../context/SectionsDataContext';

export default function useIssues() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const activeComponentId = useSelector(getActiveComponentId);
  const isShowingIssue = useSelector(getIsShowingIssue);
  const isFilterModalVisible = useSelector(getIsFilterModalVisible);
  const buildFilters = useSelector(getBuildFilters);
  const { urls, componentIds, categories } = useSelector(getUniqFilterValues);
  const [activeSwitch, setActiveSwitch] = useState(ISSUE_TYPE);
  // const [pageValue, setPageValue] = useState('');
  // const [componentValue, setComponentValue] = useState('');
  // const [categoryValue, setCategoryValue] = useState('');
  const buildData = useSelector(getBuildData);
  const customData = useSelector(getCustomData);
  const activeBuildFilters = useSelector(getBuildFilters);
  // const intermediateFilters = useSelector(getIntermediateFilters);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);
  const [sectionData, setSectionData] = useState(null);
  const [filteredBuildData, setFilteredBuildData] = useState(buildData);

  const generateData = () =>
    filteredBuildData.map((violation) => {
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

  const onCloseClick = () => {
    console.log('onCloseClick: ');
    dispatch(setIsFilterModalVisible(false));
    // dispatch(resetIntermediateFiltersToActiveFilters());
  };

  // const onApplyFilters = () => {
  //   dispatch(setReportFilters(intermediateFilters));
  //   dispatch(resetIssueItem());
  //   const path = deleteUrlQueryParam([
  //     'activeViolationId',
  //     'activeComponentId',
  //     'activeIssueIndex',
  //     'isShowingIssue'
  //   ]);
  //   navigate(`?${path}`);

  //   // update query params with applied filters
  //   const filterValues = {};
  //   Object.entries(intermediateFilters).forEach(([key, values]) => {
  //     if (key !== 'showNeedsReviewIssues' && values.length > 0) {
  //       filterValues[key] = values.map(({ value }) => value);
  //     }
  //   });
  //   const updatedPath = updateUrlWithQueryParam(filterValues);
  //   navigate(`?${updatedPath}`);
  //   setIsOpen(false);
  // };

  // const onUpdateFilters = (key, values) => {
  //   // dispatch(
  //   //   setIntermediateReportFiltersKey({
  //   //     key,
  //   //     values
  //   //   })
  //   // );
  // };

  // const onTagClose = (key) => {
  //   // if (key === 'all') {
  //   //   dispatch(resetFilters());
  //   //   dispatch(resetIntermediateFilters());
  //   //   const path = deleteUrlQueryParam(Object.keys(activeInitFilters));
  //   //   navigate(`?${path}`);
  //   // } else if (key === 'showNeedsReviewIssues') {
  //   //   const path = deleteUrlQueryParam(['showNeedsReviewIssues']);
  //   //   navigate(`?${path}`);
  //   //   dispatch(resetIntermediateResetFilterKey({ key, value: false }));
  //   //   dispatch(setResetFilterKey({ key, value: false }));
  //   // } else {
  //   //   dispatch(resetIntermediateResetFilterKey({ key, value: [] }));
  //   //   const path = deleteUrlQueryParam([key]);
  //   //   navigate(`?${path}`);
  //   //   dispatch(setResetFilterKey({ key, value: [] }));
  //   // }
  // };

  // const onNeedsReviewChecked = (event) => {
  //   const { checked } = event.target;
  //   // dispatch(
  //   //   setIntermediateReportFiltersKey({
  //   //     key: 'showNeedsReviewIssues',
  //   //     values: checked
  //   //   })
  //   // );
  // };

  // const onInputBoxChange = (option, event) => {
  //   const { checked } = event.target;

  //   let finalList;
  //   if (checked) {
  //     finalList = [...intermediateFilters.impact, option];
  //   } else {
  //     finalList = [
  //       ...intermediateFilters.impact.filter(
  //         ({ value }) => value !== option.value
  //       )
  //     ];
  //   }
  //   dispatch(
  //     setIntermediateReportFiltersKey({
  //       key: 'impact',
  //       values: finalList
  //     })
  //   );
  // };

  useEffect(() => {
    let filteredViolations = buildData.map((violation) => ({
      ...violation,
      nodes: violation.nodes.filter(
        ({ confirmed }) => confirmed === null || confirmed
      )
    }));
    if (showHiddenIssues) {
      filteredViolations = buildData.map((violation) => {
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
    if (activeBuildFilters.showNeedsReviewIssues) {
      filteredViolations = buildData.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ confirmed }) => confirmed === null)
      }));
    }
    if (activeBuildFilters.impact.length) {
      const appliedSeverityFilter = activeBuildFilters.impact.map(
        ({ value }) => value
      );
      filteredViolations = buildData.filter((violation) =>
        appliedSeverityFilter.includes(violation.impact)
      );
    }
    if (activeBuildFilters.category.length) {
      filteredViolations = filteredViolations.filter(({ tags }) => {
        const category = tags
          .find((tag) => tag.includes('cat.'))
          ?.split('cat.')[1];
        return activeBuildFilters.category
          .map(({ value }) => value)
          .includes(category);
      });
    }
    if (activeBuildFilters.page.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ page }) =>
          activeBuildFilters.page.map(({ value }) => value).includes(page.url)
        )
      }));
    }
    if (activeBuildFilters.component.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ componentId }) =>
          activeBuildFilters.component
            .map(({ value }) => value)
            .includes(componentId)
        )
      }));
    }
    setFilteredBuildData(filteredViolations);
  }, [activeBuildFilters, buildData, showHiddenIssues]);

  useEffect(() => {
    if (filteredBuildData && customData) {
      const uniqTags = [];
      const finalTags = [];
      filteredBuildData.forEach((violation) => {
        violation.tags.forEach((tag) => {
          if (!finalTags.includes(tag)) {
            finalTags.push(tag);
          }
        });
      });
      filteredBuildData.forEach((violation) => {
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
  }, [filteredBuildData, customData]);

  // const onTabSelect = (tabValue) => {
  //   dispatch(setActiveSwitch(tabValue));
  //   // dispatch(setOpenAccordionId(''));
  //   logEvent('OnADReportView', {
  //     actionType: events.allIssuesTab,
  //     tab: tabValue
  //   });
  //   const path = updateUrlWithQueryParam({
  //     activeSwitch: tabValue,
  //     activeViolationId: '',
  //     activeComponentId: '',
  //     activeIssueIndex: 0,
  //     isShowingIssue: false
  //   });
  //   navigate(`?${path}`);
  // };

  // const onHiddenIssueClick = (val) => {
  //   const path = updateUrlWithQueryParam({ hideIssues: val });
  //   navigate(`?${path}`);
  //   // dispatch(resetIssueItem());
  //   // dispatch(setShowHiddenIssues({ hideIssues: val }));
  // };

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }, []);

  return {
    urls,
    componentIds,
    categories,
    activeComponentId,
    isShowingIssue,
    isFilterModalVisible,
    buildFilters,
    sectionData,
    showHiddenIssues,
    activeSwitch,
    onFilterButtonClick,
    setActiveSwitch,
    generateData,
    onCloseClick
    // categoryValue,
    // componentValue,
    // intermediateFilters,
    // pageValue,
    // onApplyFilters,
    // onInputBoxChange,
    // setPageValue,
    // setComponentValue,
    // setCategoryValue
  };
}
