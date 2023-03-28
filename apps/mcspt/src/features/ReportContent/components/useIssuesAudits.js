import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSessionMetrics } from 'features/Report';

const useIssuesAudits = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [showAllAutdits, setShowAllAudits] = useState(false);
  const [auditsToBeShown, setAuditsToBeShown] = useState([]);

  useEffect(() => {
    const audits = sessionData?.audits?.failedAudits;

    if (audits?.length > 0) {
      setAuditsToBeShown(showAllAutdits ? audits : audits.slice(0, 3));
    }
  }, [sessionData?.audits?.failedAudits, showAllAutdits]);

  return { sessionData, showAllAutdits, setShowAllAudits, auditsToBeShown };
};

export default useIssuesAudits;
