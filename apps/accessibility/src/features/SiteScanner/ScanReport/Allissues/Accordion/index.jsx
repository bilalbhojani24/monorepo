import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ISSUE_TYPE } from 'constants';
import { SectionsDataContext } from 'features/SiteScanner/ScanReport/context/SectionsDataContext';
import { getActiveSwitch } from 'features/SiteScanner/ScanReport/slice/selector';

import Violation from './Violation';

export default function Accordion() {
  const activeSwitch = useSelector(getActiveSwitch);
  const { sectionData, violations } = useContext(SectionsDataContext);
  const isIssueTab = activeSwitch === ISSUE_TYPE;
  const finalData = isIssueTab ? violations : sectionData;
  return (
    <div>
      {finalData &&
        finalData.map(({ violation }, index) =>
          violation.nodes.length ? (
            <Violation index={index} violation={violation} />
          ) : null
        )}
    </div>
  );
}
