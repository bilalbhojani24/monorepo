import React, { useContext } from 'react';
import Violation from 'common/Violation';
import { ISSUE_TYPE } from 'constants';

import SectionsDataContext from '../../context/SectionsDataContext';

export default function ViolationList() {
  const { sectionData, violations, activeSwitch, onRowClick } =
    useContext(SectionsDataContext);
  const isIssueTab = activeSwitch === ISSUE_TYPE;
  const finalData = isIssueTab ? violations : sectionData;
  return (
    <div>
      {finalData &&
        finalData.map(({ violation }, index) =>
          violation.nodes.length ? (
            <Violation
              index={index}
              violation={violation}
              onRowClick={onRowClick}
            />
          ) : null
        )}
    </div>
  );
}
