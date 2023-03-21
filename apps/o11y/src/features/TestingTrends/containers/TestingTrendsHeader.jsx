import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import { getBuildNamesData } from 'features/SuiteHealth/slices/dataSlice';
import {
  TT_DATE_RANGE,
  TT_PARAMS_MAPPING
} from 'features/TestingTrends/constants';
import { getTTFilterByKey } from 'features/TestingTrends/slices/selectors';
import { setTTFilters } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';

const BUILD_OPTIONS = [
  {
    label: 'All Builds',
    value: 'all'
  }
];
export default function TestingTrendsHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(getProjects);
  const [builds, setBuilds] = useState([]);
  const activeBuild = useSelector((state) =>
    getTTFilterByKey(state, 'buildName')
  );
  // const activeDateRange = useSelector((state) =>
  //   getTTFilterByKey(state, 'dateRange')
  // );

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
  };

  useEffect(() => {
    if (projects.active?.normalisedName) {
      dispatch(
        getBuildNamesData({ normalisedName: projects.active?.normalisedName })
      )
        .unwrap()
        .then((res) => {
          setBuilds(res || []);
        });
    }
  }, [dispatch, projects.active?.normalisedName]);

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
    <div className="flex flex-col py-5 px-8">
      <span className="text-2xl font-bold">Testing Trends</span>
      <div className="mt-4 flex justify-between">
        <div>
          {Object.keys(TT_DATE_RANGE).map((key) => (
            <Button
              aria-label={TT_DATE_RANGE[key].label}
              colors="white"
              key={key}
              onClick={() => handleClickRange(key)}
              size="large"
              variant="primary"
              wrapperClassName="focus:outline-0"
            >
              {TT_DATE_RANGE[key].label}
            </Button>
          ))}
        </div>

        <div>
          <O11ySelectMenu onChange={handleBuildChange}>
            <O11ySelectMenuTrigger placeholder="All Builds" />
            <O11ySelectMenuOptionGroup>
              {buildList.map((item) => (
                <O11ySelectMenuOptionItem key={item.value} option={item} />
              ))}
            </O11ySelectMenuOptionGroup>
          </O11ySelectMenu>
        </div>
        {/* <O11ySelectMenu
          id="build-name-filters"
          menuOptions={buildList}
          placeholder="All Builds"
          size="default"
          wrapperClassName="to-test-trend-header__builds"
          onChange={handleBuildChange}
          isMulti={false}
          defaultSelected={activeBuild}
        /> */}
      </div>
    </div>
  );
}
