import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { getSnPTestsBreakdownData } from 'features/SuiteHealth/slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSnPTestFilterByKey
} from 'features/SuiteHealth/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import PlatformRow from '../components/PlatformsRow';
import { PLATFORM_HEADER_CELLS_MAPPING } from '../constants';
import { resetActiveTab, setSnPCbtInfo } from '../slices/dataSlice';
import { getShowSnPDetailsFor } from '../slices/selectors';

const TableRow = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickItem = (event) => {
    const { index } = event.currentTarget.dataset;
    const activeRow = props.data?.[index];
    if (activeRow) {
      dispatch(
        setSnPCbtInfo({
          osName: activeRow?.os?.name || '',
          osVersion: activeRow?.os?.version || '',
          browserName: activeRow?.browser?.name || '',
          browserVersion: activeRow?.browser?.version || '',
          deviceName: activeRow?.browser?.device || ''
        })
      );
      const searchParams = new URLSearchParams(window?.location?.search);
      dispatch(resetActiveTab());
      navigate({ search: searchParams.toString() });
    }
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <O11yTableRow {...props} hover onRowClick={handleClickItem} />;
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};

const PlatformsTab = () => {
  const testId = useSelector(getShowSnPDetailsFor);

  const dispatch = useDispatch();
  const mounted = useRef();
  const filters = useSelector(getAllSnPTestFilters);
  const activeBuild = useSelector((state) =>
    getSnPTestFilterByKey(state, 'buildName')
  );
  const activeProject = useSelector(getActiveProject);
  const [breakDownData, setBreakDownData] = useState([]);
  const [isLoadingBD, setIsLoadingBD] = useState(true);

  useEffect(() => {
    mounted.current = true;
    setIsLoadingBD(true);
    if (testId) {
      dispatch(
        getSnPTestsBreakdownData({
          normalisedName: activeProject?.normalisedName,
          testId,
          buildName: activeBuild.value,
          filters
        })
      )
        .unwrap()
        .then((res) => {
          setBreakDownData(res);
        })
        .finally(() => {
          setIsLoadingBD(false);
        });
    }

    return () => {
      mounted.current = false;
    };
  }, [
    activeBuild.value,
    dispatch,
    filters,
    activeProject?.normalisedName,
    testId
  ]);

  return (
    <div className={twClassNames('flex-1')}>
      {isLoadingBD ? (
        <O11yLoader
          wrapperClassName="h-full"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      ) : (
        <VirtualisedTable
          style={{ height: '100%' }}
          data={breakDownData}
          fixedHeaderContent={() => (
            <TableRow>
              {Object.keys(PLATFORM_HEADER_CELLS_MAPPING).map((key) => (
                <O11yTableCell
                  key={key}
                  wrapperClassName={twClassNames(
                    PLATFORM_HEADER_CELLS_MAPPING[key].defaultClass
                  )}
                >
                  <div className="text-xs font-medium leading-4">
                    {PLATFORM_HEADER_CELLS_MAPPING[key].name}
                  </div>
                </O11yTableCell>
              ))}
            </TableRow>
          )}
          itemContent={(index, buildData) => (
            <PlatformRow buildData={buildData} />
          )}
          TableRow={(props) => (
            <TableRow
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              data={breakDownData}
            />
          )}
          showFixedFooter={false}
        />
      )}
    </div>
  );
};

export default PlatformsTab;
