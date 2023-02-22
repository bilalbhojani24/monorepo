import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeInitFilters, events } from 'constants';
import {
  resetFilters,
  resetIntermediateFilters,
  resetIntermediateFiltersToActiveFilters,
  resetIntermediateResetFilterKey,
  resetIssueItem,
  setActiveSwitch,
  setIntermediateReportFiltersKey,
  setOpenAccordionId,
  setReportFilters,
  setReportFiltersKey,
  setResetFilterKey,
  setShowHiddenIssues
} from 'features/Report/slice/appSlice';
import {
  getActiveSwitch,
  getCustomData,
  getIntermediateFilters,
  getReportData,
  getReportFilters,
  getShowHiddenIssuesState
} from 'features/Report/slice/selector';
import { deleteUrlQueryParam, updateUrlWithQueryParam } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

export default function useIssues() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportData = useSelector(getReportData);
  const customData = useSelector(getCustomData);
  const activeSwitch = useSelector(getActiveSwitch);
  const activeReportFilters = useSelector(getReportFilters);
  const intermediateFilters = useSelector(getIntermediateFilters);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);
  const [isOpen, setIsOpen] = useState(false);
  const [sectionData, setSectionData] = useState(null);
  const [filteredReportData, setFilteredReportData] = useState(reportData);

  const generateData = () =>
    filteredReportData.map((violation) => {
      const totalCount = violation.nodes.length;
      return {
        violation,
        id: violation.id,
        title: `${violation.help} (${totalCount})`
      };
    });

  const onFilterButtonClick = () => {
    setIsOpen(true);
  };

  const onCloseClick = () => {
    setIsOpen(false);
    dispatch(resetIntermediateFiltersToActiveFilters());
  };

  const onApplyFilters = () => {
    dispatch(setReportFilters(intermediateFilters));
    dispatch(resetIssueItem());
    const path = deleteUrlQueryParam([
      'activeViolationId',
      'activeComponentId',
      'activeIssueIndex',
      'isShowingIssue'
    ]);
    navigate(`?${path}`);

    // update query params with applied filters
    const updatedPath = updateUrlWithQueryParam(intermediateFilters);
    navigate(`?${updatedPath}`);
    setIsOpen(false);
  };

  const onUpdateFilters = (key, values) => {
    dispatch(
      setIntermediateReportFiltersKey({
        key,
        values
      })
    );
  };

  const onTagClose = (key) => {
    if (key === 'all') {
      dispatch(resetFilters());
      dispatch(resetIntermediateFilters());
      const path = deleteUrlQueryParam(Object.keys(activeInitFilters));
      navigate(`?${path}`);
    } else if (key === 'showNeedsReviewIssues') {
      const path = deleteUrlQueryParam(['showNeedsReviewIssues']);
      navigate(`?${path}`);
      dispatch(resetIntermediateResetFilterKey({ key, value: false }));
      dispatch(setResetFilterKey({ key, value: false }));
    } else {
      dispatch(resetIntermediateResetFilterKey({ key, value: [] }));
      const path = deleteUrlQueryParam([key]);
      navigate(`?${path}`);
      dispatch(setResetFilterKey({ key, value: [] }));
    }
  };

  const onNeedsReviewChecked = (event) => {
    const { checked } = event.target;
    dispatch(
      setIntermediateReportFiltersKey({
        key: 'showNeedsReviewIssues',
        values: checked
      })
    );
  };

  const onInputBoxChange = (option, event) => {
    const { checked } = event.target;

    let finalList;
    if (checked) {
      finalList = [...intermediateFilters.impact, option];
    } else {
      finalList = [
        ...intermediateFilters.impact.filter(
          ({ value }) => value !== option.value
        )
      ];
    }
    dispatch(
      setIntermediateReportFiltersKey({
        key: 'impact',
        values: finalList
      })
    );
  };

  const onUpdateImpact = (values) => {
    dispatch(
      setReportFiltersKey({
        key: 'impact',
        values
      })
    );
  };

  useEffect(() => {
    let filteredViolations = reportData.map((violation) => ({
      ...violation,
      nodes: violation.nodes.filter(
        ({ confirmed }) => confirmed === null || confirmed
      )
    }));
    if (showHiddenIssues) {
      filteredViolations = reportData.map((violation) => {
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
    if (activeReportFilters.showNeedsReviewIssues) {
      filteredViolations = reportData.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ confirmed }) => confirmed === null)
      }));
    }
    if (activeReportFilters.impact.length) {
      filteredViolations = reportData.filter((violation) =>
        activeReportFilters.impact
          .map(({ value }) => value)
          .includes(violation.impact)
      );
    }
    if (activeReportFilters.category.length) {
      filteredViolations = filteredViolations.filter(({ tags }) => {
        const category = tags
          .find((tag) => tag.includes('cat.'))
          ?.split('cat.')[1];
        return activeReportFilters.category
          .map(({ value }) => value)
          .includes(category);
      });
    }
    if (activeReportFilters.page.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ page }) =>
          activeReportFilters.page.map(({ value }) => value).includes(page.url)
        )
      }));
    }
    if (activeReportFilters.component.length) {
      filteredViolations = filteredViolations.map((violation) => ({
        ...violation,
        nodes: violation.nodes.filter(({ componentId }) =>
          activeReportFilters.component
            .map(({ value }) => value)
            .includes(componentId)
        )
      }));
    }
    setFilteredReportData(filteredViolations);
  }, [activeReportFilters, reportData, showHiddenIssues]);

  useEffect(() => {
    if (filteredReportData && customData) {
      const uniqTags = [];
      const finalTags = [];
      filteredReportData.forEach((violation) => {
        violation.tags.forEach((tag) => {
          if (!finalTags.includes(tag)) {
            finalTags.push(tag);
          }
        });
      });
      filteredReportData.forEach((violation) => {
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
  }, [filteredReportData, customData]);

  const onTabSelect = (tabValue) => {
    dispatch(setActiveSwitch(tabValue));
    dispatch(setOpenAccordionId(''));
    logEvent('OnADReportView', {
      actionType: events.allIssuesTab,
      tab: tabValue
    });
    const path = updateUrlWithQueryParam({
      activeSwitch: tabValue,
      activeViolationId: '',
      activeComponentId: '',
      activeIssueIndex: 0,
      isShowingIssue: false
    });
    navigate(`?${path}`);
  };

  const onHiddenIssueClick = (val) => {
    const path = updateUrlWithQueryParam({ hideIssues: val });
    navigate(`?${path}`);
    dispatch(resetIssueItem());
    dispatch(setShowHiddenIssues({ hideIssues: val }));
  };

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }, []);

  return {
    activeSwitch,
    customData,
    isOpen,
    intermediateFilters,
    sectionData,
    showHiddenIssues,
    onNeedsReviewChecked,
    onHiddenIssueClick,
    onApplyFilters,
    onFilterButtonClick,
    onUpdateImpact,
    onInputBoxChange,
    onCloseClick,
    onTabSelect,
    onTagClose,
    generateData,
    onUpdateFilters
  };
}
