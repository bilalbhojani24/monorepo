import React from 'react';
import {
  O11yBadge,
  O11yButton,
  O11yHyperlink,
  O11yStackedListCommon,
  O11yStackedListItem
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

function DocumentStackListItem({
  link,
  icon,
  title,
  subTitle,
  analyticKey,
  cta,
  isUpcoming
}) {
  const handleLogIntegrationInteraction = (e) => {
    if (isUpcoming) {
      e.preventDefault();
    }
    logOllyEvent({
      event: 'O11yIntegrationsInteracted',
      data: {
        interaction: analyticKey
      }
    });
  };

  return (
    <O11yStackedListItem
      isCard={false}
      actions={
        <O11yHyperlink
          target="_blank"
          href={link}
          onClick={handleLogIntegrationInteraction}
        >
          <O11yButton
            variant="rounded"
            colors="white"
            size="small"
            disabled={isUpcoming}
          >
            {cta || 'View'}
          </O11yButton>
        </O11yHyperlink>
      }
    >
      <O11yStackedListCommon
        icon={icon}
        title={title}
        subTitle={
          isUpcoming ? (
            <O11yBadge disabled modifier="info" text="Coming soon" />
          ) : (
            subTitle
          )
        }
      />
    </O11yStackedListItem>
  );
}

DocumentStackListItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  analyticKey: PropTypes.string,
  cta: PropTypes.string,
  isUpcoming: PropTypes.bool
};

DocumentStackListItem.defaultProps = {
  link: '',
  subTitle: null,
  icon: null,
  title: null,
  analyticKey: '',
  cta: '',
  isUpcoming: false
};

export default DocumentStackListItem;
