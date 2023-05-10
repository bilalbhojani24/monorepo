import React from 'react';
import {
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
  cta
}) {
  const handleLogIntegrationInteraction = () => {
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
          <O11yButton variant="rounded" colors="white" size="small">
            {cta || 'View'}
          </O11yButton>
        </O11yHyperlink>
      }
    >
      <O11yStackedListCommon icon={icon} title={title} subTitle={subTitle} />
    </O11yStackedListItem>
  );
}

DocumentStackListItem.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  analyticKey: PropTypes.string,
  cta: PropTypes.string
};

DocumentStackListItem.defaultProps = {
  link: '',
  subTitle: null,
  icon: null,
  title: null,
  analyticKey: '',
  cta: ''
};

export default DocumentStackListItem;
