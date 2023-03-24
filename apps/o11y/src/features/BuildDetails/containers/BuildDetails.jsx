import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { MdErrorOutline } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { PUSHER_EVENTS } from 'constants/common';

import BuildDetailsHeader from '../components/BuildDetailsHeader';
import TestList from '../components/TestList';
import { TABS } from '../constants';
import {
  clearBuildUUID,
  getBuildIdFromBuildInfo,
  setActiveTab
} from '../slices/buildDetailsSlice';
import { getBuildDetailsActiveTab, getBuildUUID } from '../slices/selectors';

function BuildDetails() {
  const [loadError, setLoadError] = useState(false);
  const [testDefectTypeMapping, setTestDefectTypeMapping] = useState({});
  const buildUUID = useSelector(getBuildUUID);
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const activeTab = useSelector(getBuildDetailsActiveTab);
  const fetchBuildId = useCallback(() => {
    setLoadError(false);
    const normalisedData = {
      projectNormalisedName: encodeURI(params.projectNormalisedName),
      buildNormalisedName: encodeURI(params.buildNormalisedName),
      buildSerialId: params.buildSerialId
    };
    dispatch(getBuildIdFromBuildInfo(normalisedData))
      .unwrap()
      .catch(() => {
        setLoadError(true);
      });
  }, [
    dispatch,
    params.buildNormalisedName,
    params.buildSerialId,
    params.projectNormalisedName
  ]);

  useEffect(() => {
    fetchBuildId();
  }, [fetchBuildId]);
  useEffect(
    () => () => {
      dispatch(clearBuildUUID());
      setTestDefectTypeMapping({});
    },
    [dispatch]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('tab')) {
      const tabValue = searchParams.get('tab');
      const activeIndex = Object.keys(TABS).findIndex(
        (item) => item === tabValue
      );
      dispatch(
        setActiveTab({
          id: tabValue,
          idx: activeIndex
        })
      );
    }
  }, [dispatch, location.search]);

  const updateTestDefectTypeMapping = useCallback((data, bulk = false) => {
    if (bulk) {
      const formattedData = {};
      data.forEach((item) => {
        formattedData[item.id] = { ...item };
      });
      setTestDefectTypeMapping((prev) => ({
        ...prev,
        ...formattedData
      }));
    } else {
      setTestDefectTypeMapping((prev) => ({
        ...prev,
        [data.id]: {
          ...data
        }
      }));
    }
  }, []);

  useEffect(() => {
    window.pubSub.subscribe(PUSHER_EVENTS.ANALYZER_COMPLETED, (payload) => {
      if (payload?.data?.length && payload.buildId === buildUUID) {
        updateTestDefectTypeMapping(payload.data, true);
      }
    });
  }, [buildUUID, updateTestDefectTypeMapping]);

  if (!buildUUID) {
    return (
      <div className="bg-base-50 flex h-screen w-full items-center justify-center">
        {loadError ? (
          <div className="border-base-300 flex h-72 w-full max-w-xl items-center justify-center rounded-md border">
            <O11yEmptyState
              title="Something went wrong!"
              description="Unable to load build details"
              mainIcon={
                <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
              }
              buttonProps={{
                children: 'Reload',
                onClick: fetchBuildId,
                size: 'default'
              }}
            />
          </div>
        ) : (
          <O11yLoader text="Loading details" />
        )}
      </div>
    );
  }

  return (
    <>
      <BuildDetailsHeader />
      <div className="h-full">
        {activeTab.id === TABS.insights.id && (
          <div className="px-8 py-4">Build Insights</div>
        )}
        {activeTab.id === TABS.tests.id && (
          <TestList
            buildUUID={buildUUID}
            testDefectTypeMapping={testDefectTypeMapping}
            updateTestDefectTypeMapping={updateTestDefectTypeMapping}
          />
        )}
      </div>
    </>
  );
}

export default BuildDetails;
