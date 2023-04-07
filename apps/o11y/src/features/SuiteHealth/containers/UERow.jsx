import React from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import UEBreakdown from '../components/UEBreakdown';
import UERowHeader from '../components/UERowHeader';

export default function UERow({ data }) {
  return (
    <>
      <Accordion>
        <AccordionInteractiveHeader
          wrapperClassName="bg-white pr-0 py-0"
          title={
            <div className="flex w-full items-center py-3">
              <UERowHeader data={data} />
            </div>
          }
        />
        <AccordionPanel>
          <div className="overflow-hidden rounded-b-md">
            <UEBreakdown errorId={data.id} />
          </div>
        </AccordionPanel>
      </Accordion>
    </>
  );
}

UERow.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
