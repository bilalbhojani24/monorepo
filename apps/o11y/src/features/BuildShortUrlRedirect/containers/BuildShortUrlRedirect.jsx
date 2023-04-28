import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getBuildInfoFromUuid } from 'globalSlice/index';
import { getBuildInfo } from 'globalSlice/selectors';
import { getBuildPath } from 'utils/routeUtils';

function BuildShortUrlRedirect() {
  const params = useParams();
  const dispatch = useDispatch();
  const [isLoadingBuildInfo, setIsLoadingBuildInfo] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const buildInfo = useSelector(getBuildInfo);

  useEffect(() => {
    setNotFound(false);
    setIsLoadingBuildInfo(true);
    const data = {
      uuid: params.buildUuid
    };
    dispatch(getBuildInfoFromUuid(data))
      .unwrap()
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setIsLoadingBuildInfo(false);
      });
  }, [dispatch, params.buildUuid]);

  if (isLoadingBuildInfo) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <O11yLoader loaderClass="w-10 h-10 fill-base-500" />
      </div>
    );
  }
  if (notFound) {
    return <Navigate to={ROUTES.not_found} replace />;
  }
  if (buildInfo) {
    return (
      <Navigate
        to={getBuildPath(
          buildInfo.projectNormalisedName,
          buildInfo.buildNormalisedName,
          buildInfo.buildSerialId
        )}
        replace
      />
    );
  }
  return <></>;
}

export default BuildShortUrlRedirect;
