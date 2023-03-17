import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdErrorOutline } from '@browserstack/bifrost';
import {
  BitBucketIcon,
  BuildKiteIcon,
  GithubIcon,
  GitIcon,
  GitLabIcon,
  JenkinsIcon,
  JiraIcon
} from 'assets/icons/components';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';

import BuildDetailsHeader from '../components/BuildDetailsHeader';
import { getBuildIdFromBuildInfo } from '../slices/buildDetailsSlice';
import { getBuildUUID } from '../slices/selectors';

function BuildDetails() {
  const [loadError, setLoadError] = useState(false);
  const buildUUID = useSelector(getBuildUUID);
  const params = useParams();
  const dispatch = useDispatch();
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
          <O11yLoader
            loaderClass="text-base-200 fill-base-400 w-8 h-8"
            text="Loading details"
          />
        )}
      </div>
    );
  }

  return (
    <>
      <BuildDetailsHeader />
      <div className="px-8">
        <div className="py-4">
          <JiraIcon className="h-6 w-6" />
          <JenkinsIcon className="h-6 w-6" />
          <GithubIcon className="h-6 w-6" />
          <GitLabIcon className="h-6 w-6" />
          <BuildKiteIcon className="h-6 w-6" />
          <BitBucketIcon className="h-6 w-6" />
          <GitIcon className="h-6 w-6" color="#F05133" />
        </div>
      </div>
    </>
  );
}

export default BuildDetails;
