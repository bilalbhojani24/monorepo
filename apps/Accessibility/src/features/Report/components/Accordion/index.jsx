import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ISSUE_TYPE } from 'constants';
import { SectionsDataContext } from 'features/Report/context/SectionsDataContext';
import { getActiveSwitch } from 'features/Report/slice/selector';

import Violation from './Violation';

export default function Accordion() {
  const activeSwitch = useSelector(getActiveSwitch);
  const { sectionData, violations } = useContext(SectionsDataContext);
  const isIssueTab = activeSwitch === ISSUE_TYPE;
  const finalData = isIssueTab ? violations : sectionData;
  return (
    <div className="issue-accordion">
      {finalData &&
        finalData.map(({ violation }) =>
          violation.nodes.length ? <Violation violation={violation} /> : null
        )}
    </div>
  );
}
