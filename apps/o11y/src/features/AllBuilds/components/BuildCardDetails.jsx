import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { O11yMetaData, O11yTableCell } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { TABLE_CLASSES } from '../constants';

import BuildItemDetails from './BuildItemDetails';
import FailureCategoriesPill from './FailureCategoriesPill';

const BuildCardDetails = ({ data }) => {
  const navigate = useNavigate();
  const { projectNormalisedName } = useParams();

  const activeProject = useSelector(getActiveProject);

  const logBuildListingInteracted = (interaction) => {
    logOllyEvent({
      event: 'O11yBuildListingInteracted',
      project_name: activeProject.name,
      build_name: data?.isAutoDetectedName ? data?.originalName : data?.name,
      interaction
    });
  };

  const navigateToTestPage = (itemCategory, clickData) => {
    const interactionName = `${clickData.itemClicked
      .replace(' ', '_')
      .toLowerCase()}_clicked`;
    logBuildListingInteracted(interactionName);
    let endpoint = `/projects/${projectNormalisedName}/builds/${
      data?.isAutoDetectedName ? data?.originalName : data?.name
    }/${data?.buildNumber}?tab=tests`;
    endpoint += `&${itemCategory}=${clickData.itemClicked}`;
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
                navigateToTestPage('status', clickData)
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
        />
      </O11yTableCell>
    </>
  );
};

BuildCardDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildCardDetails;
