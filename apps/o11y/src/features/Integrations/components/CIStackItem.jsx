import React, { useEffect, useState } from 'react';
import { getIntegrationStatusBySlug } from 'api/integrations';
import {
  O11yBadge,
  O11yButton,
  O11yStackedListCommon,
  O11yStackedListItem
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

function CIStackItem({ icon, title, analyticKey, cta, apiSlug }) {
  const [apiData, setApiData] = useState('');

  const handleLogIntegrationInteraction = () => {
    logOllyEvent({
      event: 'O11yIntegrationsInteracted',
      data: {
        interaction: analyticKey
      }
    });
  };

  useEffect(() => {
    getIntegrationStatusBySlug({ slug: apiSlug }).then((res) => {
      setApiData(res.data);
    });
  }, [apiSlug]);

  return (
    <O11yStackedListItem
      isCard={false}
      actions={
        <O11yButton
          variant="rounded"
          colors="white"
          size="small"
          onClick={handleLogIntegrationInteraction}
        >
          {cta || 'Configure'}
        </O11yButton>
      }
    >
      <O11yStackedListCommon
        icon={icon}
        title={title}
        subTitle={
          apiData ? (
            <O11yBadge
              disabled
              hasDot={{
                summary: 'false'
              }}
              isRounded={{
                summary: 'false'
              }}
              modifier="success"
              text="Configured"
            />
          ) : (
            'Not Configured'
          )
        }
      />
    </O11yStackedListItem>
  );
}

CIStackItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  analyticKey: PropTypes.string,
  cta: PropTypes.string,
  apiSlug: PropTypes.string.isRequired
};

CIStackItem.defaultProps = {
  icon: null,
  title: null,
  analyticKey: '',
  cta: ''
};

export default CIStackItem;
