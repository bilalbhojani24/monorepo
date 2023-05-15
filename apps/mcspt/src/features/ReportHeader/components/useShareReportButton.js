import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getIsSharableLinkGenerating,
  getShareableLinkForReport
} from '../slices/reportHeaderSlice';
import { generateSharableLinkForReport } from '../slices/reportHeaderThunks';

const useShareReportButton = () => {
  const [showSharedLinkPopover, setShowSharedLinkPopover] = useState(false);

  const isSharableLinkGenerating = useSelector(getIsSharableLinkGenerating);
  const shareableLinkForReport = useSelector(getShareableLinkForReport);

  const dispatch = useDispatch();

  const shareReportClicked = () => {
    if (shareableLinkForReport) {
      setShowSharedLinkPopover(true);
    } else {
      dispatch(generateSharableLinkForReport(setShowSharedLinkPopover));
    }
  };

  const hideSharedLinkPopover = () => {
    setShowSharedLinkPopover(false);
  };

  return {
    isSharableLinkGenerating,
    showSharedLinkPopover,
    shareReportClicked,
    hideSharedLinkPopover
  };
};

export default useShareReportButton;
