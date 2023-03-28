import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import {
  TT_DATE_RANGE,
  TT_PARAMS_MAPPING
} from 'features/TestingTrends/constants';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import {
  getBuildNamesData,
  setTTFilters
} from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

const BUILD_OPTIONS = [
  {
    label: 'All Builds',
    value: 'all'
  }
];
export default function TestingTrendsHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeProject = useSelector(getActiveProject);
  const [builds, setBuilds] = useState([]);
  const allTTFilters = useSelector(getAllTTFilters);
  const activeBuild = useSelector((state) =>
    getTTFilterByKey(state, 'buildName')
  );

  const handleClickRange = (key) => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set(TT_PARAMS_MAPPING.ttDateRange, key);
    searchParams.delete(TT_PARAMS_MAPPING.ttToDate);
    searchParams.delete(TT_PARAMS_MAPPING.ttFromDate);
    navigate({ search: searchParams.toString() });
    dispatch(
      setTTFilters({
        dateRange: {
          key,
          ...TT_DATE_RANGE[key].getDuration
        }
      })
    );
    logOllyEvent({
      event: 'O11yTestingTrendsInteracted',
      data: {
        project_name: activeProject?.name,
        project_id: activeProject?.id,
        interaction: 'time_filter_changed'
      }
    });
  };

  const handleBuildChange = (selectedItem) => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set(TT_PARAMS_MAPPING.ttActiveBuild, selectedItem.value);
    navigate({ search: searchParams.toString() });
    dispatch(
      setTTFilters({
        buildName: selectedItem
      })
    );
    logOllyEvent({
      event: 'O11yTestingTrendsInteracted',
      data: {
        project_name: activeProject?.name,
        project_id: activeProject?.id,
        interaction: 'build_filter_applied'
      }
    });
  };

  useEffect(() => {
    if (activeProject?.normalisedName) {
      dispatch(
        getBuildNamesData({ normalisedName: activeProject?.normalisedName })
      )
        .unwrap()
        .then((res) => {
          setBuilds(res?.data || []);
        });
    }
  }, [dispatch, activeProject?.normalisedName]);

  useEffect(() => {
    if (
      activeBuild.value !== 'all' &&
      builds?.length &&
      !builds.includes(activeBuild.value)
    ) {
      dispatch(
        setTTFilters({
          buildName: {
            label: 'All Builds',
            value: 'all'
          }
        })
      );
    }
  }, [activeBuild.value, builds, dispatch]);

  const buildList = useMemo(() => {
    if (builds.length) {
      const menuItems = builds.map((item) => ({
        label: item,
        value: item
      }));
      return [...BUILD_OPTIONS, ...menuItems];
    }
    return BUILD_OPTIONS;
  }, [builds]);

  return (
    <div
      className={twClassNames(
        'sticky top-16 z-10 flex flex-col py-6 px-6 bg-base-50'
      )}
    >
      <span className="text-2xl font-bold">Testing Trends</span>
      <div className="mt-4 flex justify-between">
        <div>
          {Object.keys(TT_DATE_RANGE).map((key, index) => {
            let wrapperClassName = 'rounded-none focus:outline-0';
            switch (index) {
              case 0:
                wrapperClassName = `border border-base-300 rounded-none rounded-l-md border-r-0 
              focus:ring-offset-0 focus:border-r peer/days7 focus:z-[1] focus:ring-1 
              ring-brand-500 text-sm font-medium text-base-700`;
                break;
              case Object.keys(TT_DATE_RANGE).length - 1:
                wrapperClassName = `peer-focus/days15:border-l-0 focus:z-[1] focus:ring-1 ring-brand-500 
                border border-base-300 rounded-none first:rounded-l-md last:rounded-r-md focus:ring-offset-0 
                text-sm font-medium text-base-700`;
                break;
              default:
                wrapperClassName = `peer/days15 peer-focus/days7:border-l-0 focus:z-[1] focus:ring-1 
                ring-brand-500 border border-base-300 rounded-none focus:ring-offset-0 
                focus:border-r border-r-0 text-sm font-medium text-base-700`;
                break;
            }
            return (
              <O11yButton
                aria-label={TT_DATE_RANGE[key].label}
                colors="white"
                key={key}
                onClick={() => handleClickRange(key)}
                size="large"
                variant="primary"
                wrapperClassName={twClassNames(wrapperClassName, {
                  'border-brand-500 ring-1 z-[1] border-r':
                    allTTFilters.dateRange.key === key
                })}
              >
                {TT_DATE_RANGE[key].label}
              </O11yButton>
            );
          })}
        </div>

        <div>
          <O11ySelectMenu
            onChange={handleBuildChange}
            defaultValue={activeBuild}
          >
            <O11ySelectMenuTrigger placeholder="All Builds" />
            <O11ySelectMenuOptionGroup>
              {buildList.map((item) => (
                <O11ySelectMenuOptionItem
                  key={item.value}
                  option={item}
                  checkPosition="right"
                />
              ))}
            </O11ySelectMenuOptionGroup>
          </O11ySelectMenu>
        </div>
      </div>
    </div>
  );
}
