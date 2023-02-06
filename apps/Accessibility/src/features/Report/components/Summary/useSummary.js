import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { events } from 'constants';
import {
  resetFilters,
  resetIntermediateFilters,
  resetIssueItem,
  setIntermediateReportFiltersKey,
  setReportFiltersKey,
  setShowHiddenIssues
} from 'features/Report/slice/appSlice';
import {
  getReportData,
  getReportMetaData
} from 'features/Report/slice/selector';
import cloneDeep from 'lodash/cloneDeep';
import max from 'lodash/max';
import { updateUrlWithQueryParam } from 'utils/helper';
// import { logEvent } from 'utils/logEvent';

export default function useSummary() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const reportMetaData = useSelector(getReportMetaData);
  const reportData = useSelector(getReportData);
  const {
    issueSummary: { critical, minor, moderate, serious, issueCount },
    chartData: { issueCountByCategory }
  } = reportMetaData;
  const map = {
    aria: 'Aria',
    'name-role-value': 'Alt-area',
    color: 'Color',
    forms: 'Forms',
    keyboard: 'Keyboard',
    language: 'Language',
    parsing: 'Parsing',
    semantics: 'Semantics',
    'sensory-and-visual-cues': 'Sensory & Visual',
    structure: 'Structure',
    tables: 'Labels',
    'text-alternatives': 'Text Alternative',
    'time-and-media': 'Time & Media'
  };

  const getHiddenIssuesCount = () => {
    let hiddenIssues = 0;
    let needsReviewIssues = 0;

    reportData.forEach((data) => {
      data.nodes.forEach((node) => {
        node.childNodes.forEach((item) => {
          if (item.hidden) {
            hiddenIssues += 1;
          }
        });
        if (node.confirmed === null) {
          needsReviewIssues += 1;
        }
      });
    });
    if (hiddenIssues < 10) {
      hiddenIssues = `0${hiddenIssues}`;
    }

    if (needsReviewIssues < 10) {
      needsReviewIssues = `0${needsReviewIssues}`;
    }
    return { hiddenIssues, needsReviewIssues };
  };

  const [categoryList, setCategoryList] = useState(issueCountByCategory);
  const maxCategoryIssue = max(categoryList.map(({ count }) => count));

  const onRowClick = (filter, value, shouldShowNeedsReviewIssues = false) => {
    const values = shouldShowNeedsReviewIssues || [value];
    dispatch(resetFilters());
    dispatch(setShowHiddenIssues({ hideIssues: false }));
    dispatch(resetIntermediateFilters());
    dispatch(setReportFiltersKey({ key: filter, values }));
    dispatch(setIntermediateReportFiltersKey({ key: filter, values }));

    // append filter to url as query param
    history.push({
      search: `?${updateUrlWithQueryParam({ [filter]: value })}`
    });
    document.getElementById('base-tabs-tab-1').click();
  };

  const onHiddenIssueClick = () => {
    dispatch(setShowHiddenIssues({ hideIssues: true }));
    dispatch(resetFilters());
    dispatch(resetIntermediateFilters());
    dispatch(resetIssueItem());
    history.push({
      search: `?${updateUrlWithQueryParam({ hideIssues: true })}`
    });
    document.getElementById('base-tabs-tab-1').click();
  };

  const chartOption = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: '260px'
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: `<p class="chart__title-count">${issueCount}</p><p class="chart__title">Issues</p>`,
      verticalAlign: 'middle',
      y: 5,
      useHTML: true
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        center: ['50%', '50%'],
        size: '100%'
      }
    },
    series: [
      {
        name: 'Issue by impact',
        colorByPoint: true,
        borderWidth: 9,
        borderColor: null,
        slicedOffset: 0,
        innerSize: '98%',
        ignoreHiddenPoint: false,
        point: {
          events: {
            click: (value) => {
              onRowClick('impact', value?.point?.options?.name.toLowerCase());
            },
            mouseOver: (value) => {
              logEvent('OnADReportView', {
                actionType: events.INTERACT_WITH_CHART,
                chartType: 'Issue summary',
                severity: value?.target?.options?.name
              });
            }
          }
        },
        data: [
          {
            name: 'Critical',
            y: critical,
            sliced: true,
            color: '#F95D6A',
            selected: true
          },
          {
            visible: false,
            // NOTE: This define the empty space between pie chart,
            // Increase the ↑1.7 to increase the space and to decrease the space, vice versa
            y: (issueCount * 1.7) / 100
          },
          {
            name: 'Serious',
            y: serious,
            sliced: true,
            color: '#FF9933'
          },
          {
            visible: false,
            y: (issueCount * 1.7) / 100
          },
          {
            name: 'Moderate',
            y: moderate,
            sliced: true,
            color: '#E3C500'
          },
          {
            visible: false,
            y: (issueCount * 1.7) / 100
          },
          {
            name: 'Minor',
            y: minor,
            sliced: true,
            color: '#C5D1D8'
          },
          {
            visible: false,
            y: (issueCount * 1.7) / 100
          }
        ]
      }
    ]
  };

  const onMenuChange = (item) => {
    const { value } = item;
    if (value === 'char-sort') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) =>
          map[a.category.split('cat.')[1]].localeCompare(
            map[b.category.split('cat.')[1]]
          )
        )
      );
    } else if (value === 'desc') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) => b.count - a.count)
      );
    } else if (value === 'asc') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) => a.count - b.count)
      );
    }
    logEvent('OnADReportView', {
      actionType: events.INTERACT_WITH_CHART,
      chartType: 'Issue category',
      sortType: value
    });
  };

  useEffect(() => {
    setCategoryList(
      cloneDeep(issueCountByCategory).sort((a, b) => b.count - a.count)
    );
  }, [issueCountByCategory]);

  return {
    reportMetaData,
    chartOption,
    categoryList,
    maxCategoryIssue,
    map,
    onRowClick,
    onHiddenIssueClick,
    getHiddenIssuesCount,
    onMenuChange
  };
}
