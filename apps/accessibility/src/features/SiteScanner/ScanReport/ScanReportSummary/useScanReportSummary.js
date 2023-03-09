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
import cloneDeep from 'lodash/cloneDeep';
import max from 'lodash/max';
import { updateUrlWithQueryParam } from 'utils/helper';

import {
  getScanReportMetaData,
  getScanReportOverviewData
} from '../../slices/selector';
// import { logEvent } from 'utils/logEvent';

export default function useScanReportSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportOverviewMetaData = useSelector(getScanReportMetaData);
  const reportData = useSelector(getScanReportOverviewData);
  const {
    issueSummary: { critical, minor, moderate, serious, issueCount },
    chartData: { issueCountByCategory }
  } = reportOverviewMetaData;

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
    // console.log('Hii');
    dispatch(resetFilters());
    dispatch(setShowHiddenIssues({ hideIssues: false }));
    dispatch(resetIntermediateFilters());
    dispatch(setReportFiltersKey({ key: filter, values }));
    dispatch(setIntermediateReportFiltersKey({ key: filter, values }));

    // append filter to url as query param
    const path = updateUrlWithQueryParam({ [filter]: value });
    navigate(`?${path}`);
    document.querySelector('button[value="All issues"]').click();
  };

  const onHiddenIssueClick = () => {
    dispatch(setShowHiddenIssues({ hideIssues: true }));
    dispatch(resetFilters());
    dispatch(resetIntermediateFilters());
    dispatch(resetIssueItem());
    const path = updateUrlWithQueryParam({ hideIssues: true });
    navigate(`?${path}`);
    document.querySelector('button[value="All issues"]').click();
  };

  const chartOption = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: '342px'
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: `<div style="font-family: Inter, Avenir, Helvetica, Arial, sans-serif"><p class="text-xl font-bold text-center mb-2 text-base-800">${issueCount}</p><p class="text-xs text-base-500">Issues</p></div>`,
      verticalAlign: 'middle',
      useHTML: true
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Issue by impact',
        point: {
          events: {
            click: (value) => {
              onRowClick('impact', value?.point?.options?.name.toLowerCase());
            },
            mouseOver: (value) => {
              // logEvent('OnADReportView', {
              //   actionType: events.INTERACT_WITH_CHART,
              //   chartType: 'Issue summary',
              //   severity: value?.target?.options?.name
              // });
            }
          }
        },
        data: [
          {
            name: 'Critical',
            y: critical,
            color: '#F95D6A',
            selected: true
          },
          {
            name: 'Serious',
            y: serious,
            color: '#FF9933'
          },
          {
            name: 'Moderate',
            y: moderate,
            color: '#E3C500'
          },
          {
            name: 'Minor',
            y: minor,
            color: '#C5D1D8'
          }
        ]
      }
    ]
  };

  const onMenuChange = (option) => {
    const { id } = option;
    if (id === 'char-sort') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) =>
          map[a.category.split('cat.')[1]].localeCompare(
            map[b.category.split('cat.')[1]]
          )
        )
      );
    } else if (id === 'desc') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) => b.count - a.count)
      );
    } else if (id === 'asc') {
      setCategoryList(
        cloneDeep(categoryList).sort((a, b) => a.count - b.count)
      );
    }
    // logEvent('OnADReportView', {
    //   actionType: events.INTERACT_WITH_CHART,
    //   chartType: 'Issue category',
    //   sortType: id
    // });
  };

  useEffect(() => {
    setCategoryList(
      cloneDeep(issueCountByCategory).sort((a, b) => b.count - a.count)
    );
  }, [issueCountByCategory]);

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }, []);

  return {
    reportOverviewMetaData,
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
