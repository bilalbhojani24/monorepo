import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yAccordian } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import UEBreakdown from '../components/UEBreakdown';
import UERowHeader from '../components/UERowHeader';
import { getSnPUEBreakdownData } from '../slices/dataSlice';
import { getAllSnPTestFilters, getSnpErrorsSortBy } from '../slices/selectors';

export default function UERow({ data }) {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);

  const [breakDownData, setBreakDownData] = useState([]);
  const [isLoadingBD, setIsLoadingBD] = useState(true);
  const filters = useSelector(getAllSnPTestFilters);
  const sortBy = useSelector(getSnpErrorsSortBy);

  const fetchBreakDownData = () => {
    setIsLoadingBD(true);
    dispatch(
      getSnPUEBreakdownData({
        normalisedName: activeProject?.normalisedName,
        errorId: data.id,
        filters,
        sortOptions: sortBy
      })
    )
      .unwrap()
      .then((res) => {
        setBreakDownData(res);
      })
      .finally(() => {
        setIsLoadingBD(false);
      });
  };

  return (
    <>
      <O11yAccordian
        triggerClassName="pl-5 pt-0 bg-white flex items-center hover:bg-brand-50 rounded-b-md cursor-pointer"
        triggerContentNode={<UERowHeader data={data} />}
        panelContentNode={
          <div className="overflow-hidden rounded-b-md">
            <UEBreakdown
              errorId={data.id}
              isLoading={isLoadingBD}
              data={breakDownData}
            />
          </div>
        }
        onTriggerClick={() => {
          if (!breakDownData.length) {
            fetchBreakDownData();
          }
        }}
      />
    </>
  );
}

UERow.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
