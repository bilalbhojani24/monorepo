import React from 'react';
// import { cards } from 'features/TestsInsights/constants';
import PropTypes from 'prop-types';

import Alerts from '../components/Alerts';
import AlwaysFailing from '../components/AlwaysFailing';
import BuildHistory from '../components/BuildHistory';
import BuildStability from '../components/BuildStability';
import BuildSummary from '../components/BuildSummary';
import FailureCategories from '../components/FailureCategories';
import FailuresByFolders from '../components/FailuresByFolders';
import Flakiness from '../components/Flakiness';
import MutedTests from '../components/MutedTests';
import NewFailures from '../components/NewFailures';
import ReRunSummary from '../components/ReRunSummary';
import TopErrors from '../components/TopErrors';
// import CardHeader from '../widgets/CardHeader';

export default function DashboardCard({ cardKey }) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (cardKey) {
    case 'buildSummary':
      return <BuildSummary />;
    case 'failureCategories':
      return <FailureCategories />;
    case 'alwaysFailing':
      return <AlwaysFailing />;
    case 'newFailures':
      return <NewFailures />;
    case 'flakiness':
      return <Flakiness />;
    case 'mutedTests':
      return <MutedTests />;
    case 'buildStability':
      return <BuildStability />;
    case 'buildHistory':
      return <BuildHistory />;
    case 'alerts':
      return <Alerts />;
    case 'reRunSummary':
      return <ReRunSummary />;
    case 'buildTimeline':
      return null;
    case 'topErrors':
      return <TopErrors />;
    case 'failuresByFolders':
      return <FailuresByFolders />;
    default:
    // return <CardHeader title={cards[cardKey].title} />;
  }
}
DashboardCard.propTypes = {
  cardKey: PropTypes.string.isRequired
};
