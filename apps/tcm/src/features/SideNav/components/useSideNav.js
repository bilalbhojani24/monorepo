import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoute from 'const/routes';

import {
  basePrimaryNavLinks,
  internalPrimaryNavLinks,
  secondaryNavLinks,
} from '../const/navsConst';

export default function useSideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [primaryNavs, setPrimaryNavs] = useState();
  const [secondaryNavs, setSecondaryNavs] = useState([]);
  const [allProjectsDrop, setAllProjectsDrop] = useState([]);
  const [showProjects, setShowProjects] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);
  const baseViewRoutes = [
    AppRoute.ROOT,
    AppRoute.SETTINGS,
    AppRoute.DOCUMENTATION,
  ];
  const allProjects = useSelector((state) => state.global.activeProjects);
  const selectedProjectId = useSelector(
    (state) => state.global.selectedProjectId,
  );

  const onLinkChange = (linkItem) => {
    navigate(linkItem.path);
  };

  const dynamicLinkReplaceHelper = (array) =>
    array.map((item) => ({
      ...item,
      path: item.path.replace('$PROJECTID$', selectedProjectId),
    }));

  useEffect(() => {
    // set view
    if (baseViewRoutes.includes(location.pathname)) {
      // basic view page without secondary navs
      setShowProjects(false);
      setPrimaryNavs(dynamicLinkReplaceHelper(basePrimaryNavLinks));
      setSecondaryNavs([]);
    } else {
      // with secondary navs
      setShowProjects(true);
      setPrimaryNavs(dynamicLinkReplaceHelper(internalPrimaryNavLinks));
      setSecondaryNavs(dynamicLinkReplaceHelper(secondaryNavLinks));
    }

    // set current view
    setActiveRoute({
      id: location.pathname,
    });
  }, [location.pathname, selectedProjectId]);

  useEffect(() => {
    setAllProjectsDrop(
      allProjects.map((item) => ({
        ...item,
        label: item.name,
        value: item.id,
      })),
    );
    // to be mapped
  }, [allProjects]);

  return {
    onLinkChange,
    primaryNavs,
    secondaryNavs,
    allProjectsDrop,
    showProjects,
    activeRoute,
  };
}
