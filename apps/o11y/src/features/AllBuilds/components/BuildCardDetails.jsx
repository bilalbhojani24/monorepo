import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { O11yMetaData, O11yTableCell } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';
import { getBuildPath } from 'utils/routeUtils';

import { TABLE_CLASSES, TEST_LIST_FILTERS_INTERACTIONS } from '../constants';

import BuildItemDetails from './BuildItemDetails';
import FailureCategoriesPill from './FailureCategoriesPill';

const BuildCardDetails = ({ data }) => {
  const navigate = useNavigate();

  const activeProject = useSelector(getActiveProject);

  const logBuildListingInteracted = (interaction) => {
    logOllyEvent({
      event: 'O11yBuildListingInteracted',
      data: {
        project_name: activeProject.name,
        build_name: data?.isAutoDetectedName ? data?.originalName : data?.name,
        interaction
      }
    });
  };

  const navigateToTestPage = (itemCategory, value, interaction) => {
    logBuildListingInteracted(interaction);
    let endpoint = `${getBuildPath(
      activeProject.normalisedName,
      data.normalisedName,
      data?.buildNumber
    )}?tab=tests`;
    endpoint += `&${itemCategory}=${value}`;
    navigate(endpoint);
  };

  return (
    <>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.BUILD,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <BuildItemDetails
          data={data}
          logBuildListingInteracted={logBuildListingInteracted}
          navigateToTestPage={navigateToTestPage}
        />
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.TEST,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <PropagationBlocker className="flex justify-end">
          {data?.status && (
            <StatusBadges
              size="large"
              statusStats={data.statusStats}
              onClickHandler={(clickData) =>
                navigateToTestPage(
                  ADV_FILTER_TYPES.status.key,
                  clickData.itemClicked,
                  TEST_LIST_FILTERS_INTERACTIONS[clickData.itemClicked]
                )
              }
            />
          )}
        </PropagationBlocker>
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.DURATION,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        {data.duration ? (
          <O11yMetaData
            textColorClass="text-base-500 inline-flex text-sm"
            metaDescription={milliSecondsToTime(data.duration)}
            metaTitle="Duration"
          />
        ) : null}
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.FAILURE_CATEGORY,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <FailureCategoriesPill
          data={data}
          logBuildListingInteracted={logBuildListingInteracted}
          navigateToTestPage={navigateToTestPage}
        />
      </O11yTableCell>
    </>
  );
};

BuildCardDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildCardDetails;
