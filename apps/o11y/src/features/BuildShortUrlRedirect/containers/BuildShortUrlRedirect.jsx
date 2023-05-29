import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { setStorage } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getBuildInfoFromUuid, setActiveProject } from 'globalSlice/index';
import { getBuildInfo, getProjects } from 'globalSlice/selectors';
import { getBuildPath } from 'utils/routeUtils';

function BuildShortUrlRedirect() {
  const projects = useSelector(getProjects);
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
      .then((info) => {
        const projectList = projects.list || [];
        if (projectList.length && info.projectNormalisedName) {
          const foundProject = projectList.find(
            (item) => item.normalisedName === info.projectNormalisedName
          );
          if (foundProject) {
            dispatch(
              setActiveProject({
                id: foundProject.id,
                name: foundProject.name,
                normalisedName: foundProject.normalisedName
              })
            );
            setStorage(
              PROJECT_NORMALISED_NAME_IDENTIFIER,
              info.projectNormalisedName
            );
          }
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setIsLoadingBuildInfo(false);
      });
  }, [dispatch, params.buildUuid, projects.list]);

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
