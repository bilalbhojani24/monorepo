import React from 'react';
import { MdOutlineMailOutline } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yStackedListCommon,
  O11yStackedListItem
} from 'common/bifrostProxy';
import { logOllyEvent } from 'utils/common';

function EmailCommunicationItem() {
  const handleClickEmailConfigure = () => {
    logOllyEvent({
      event: 'O11yIntegrationsOnEmailConfigure',
      data: {
        source: 'direct'
      }
    });
  };

  return (
    <O11yStackedListItem
      isCard={false}
      actions={
        <O11yButton
          variant="rounded"
          colors="white"
          size="small"
          onClick={handleClickEmailConfigure}
        >
          Configure
        </O11yButton>
      }
    >
      <O11yStackedListCommon
        icon={<MdOutlineMailOutline className="h-10 w-10 rounded-full" />}
        title="Email"
      />
    </O11yStackedListItem>
  );
}

export default EmailCommunicationItem;
