import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineBugReport } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { showIntegrationsWidget } from 'features/IntegrationsWidget/utils';
import { AppContext } from 'features/Layout/context/AppContext';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getShowTestDetailsFor } from '../slices/selectors';

function ReportBugTrigger() {
  const dispatch = useDispatch();

  const { setWidgetPositionRef } = useContext(AppContext);

  const [isLoadingBugDetails, setIsLoadingBugDetails] = useState(false);
  const testRunId = useSelector(getShowTestDetailsFor);
  const { handleLogTDInteractionEvent, panelRef } =
    useTestDetailsContentContext();
  const handleReportBugClick = async () => {
    handleLogTDInteractionEvent({
      interaction: 'report_bug_clicked'
    });
    setIsLoadingBugDetails(true);
    if (panelRef.current) {
      setWidgetPositionRef(panelRef.current);
    }
    dispatch(showIntegrationsWidget({ testRunId, widgetPosition: 'left' }))
      .then(() => {
        setIsLoadingBugDetails(true);
      })
      .finally(() => {
        setIsLoadingBugDetails(false);
      });
  };

  return (
    <O11yButton
      isIconOnlyButton
      icon={<MdOutlineBugReport className="h-full w-full" />}
      colors="white"
      onClick={handleReportBugClick}
      loading={isLoadingBugDetails}
    />
  );
}

export default ReportBugTrigger;
