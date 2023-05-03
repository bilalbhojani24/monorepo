import { useState } from 'react';
import { events } from 'constants';
import cloneDeep from 'lodash/cloneDeep';
import max from 'lodash/max';
import { logEvent } from 'utils/logEvent';

export default function useCategoryCard({ issueCountByCategory, eventName }) {
  const [categoryList, setCategoryList] = useState(issueCountByCategory);
  const maxCategoryIssue = max(categoryList.map(({ count }) => count));
  const categoryColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'category',
      name: 'Category',
      key: 'category'
    },
    {
      id: 'issueCount',
      name: 'Issue Count',
      key: 'issueCount'
    }
  ];

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
    logEvent(eventName, {
      actionType: events.INTERACT_WITH_CHART,
      chartType: 'Issue category',
      sortType: id
    });
  };

  return {
    categoryList,
    categoryColumns,
    map,
    maxCategoryIssue,
    onMenuChange
  };
}
