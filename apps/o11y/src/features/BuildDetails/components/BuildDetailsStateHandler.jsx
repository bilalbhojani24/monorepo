import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getBuildMeta } from '../slices/selectors';

import BuildParsingFailure from './BuildParsingFailure';
import BuildReportProcessing from './BuildReportProcessing';

function BuildDetailsStateHandler({ children }) {
  const buildMeta = useSelector(getBuildMeta);

  if (buildMeta.isLoading && isEmpty(buildMeta.data)) {
    return null;
  }
  if (buildMeta?.data?.buildError?.message) {
    return <BuildParsingFailure />;
  }
  if (buildMeta?.data?.isParsingReport) {
    return <BuildReportProcessing />;
  }
  return children;
}

export default React.memo(BuildDetailsStateHandler);
