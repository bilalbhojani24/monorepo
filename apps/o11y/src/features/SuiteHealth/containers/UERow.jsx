import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import UEBreakdown from '../components/UEBreakdown';
import UERowHeader from '../components/UERowHeader';
import { updateSingleBDOpenStatus } from '../slices/dataSlice';
import { getUESingleBreakdownData } from '../slices/selectors';

export default function UERow({ data }) {
  const dispatch = useDispatch();
  const singleBDData = useSelector((state) =>
    getUESingleBreakdownData(state, data.id)
  );

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
          controller={singleBDData?.defaultOpen}
          onClick={() => {
            dispatch(
              updateSingleBDOpenStatus({
                errorId: data.id,
                defaultOpen: !singleBDData?.defaultOpen
              })
            );
          }}
        />
        <AccordionPanel controller={singleBDData?.defaultOpen}>
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
