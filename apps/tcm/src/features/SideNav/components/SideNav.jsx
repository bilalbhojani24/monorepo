import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarNavigation } from '@browserstack/bifrost';
import AppRoute from 'const/routes';
import useSideNav from './useSideNav';
import { basePrimaryNavLinks, internalPrimaryNavLinks, secondaryNavLinks } from '../const/navsConst';

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allProjects } = useSideNav();
  const [primaryNavs, setPrimaryNavs] = useState();
  const [secondaryNavs, setSecondaryNavs] = useState([]);
  const [allProjectsDrop, setAllProjectsDrop] = useState([]);
  const [showProjects, setShowProjects] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);
  const baseViewRoutes = [AppRoute.PROJECTS, AppRoute.SETTINGS, AppRoute.DOCUMENTATION];

  const onLinkChange = (linkItem) => {
    navigate(linkItem.path);
  };

  useEffect(() => {
    //set view
    if (baseViewRoutes.includes(location.pathname)) {
      // basic view page without secondary navs
      setShowProjects(false);
      setPrimaryNavs(basePrimaryNavLinks);
      setSecondaryNavs([]);
    } else {
      // with secondary navs
      setShowProjects(true);
      setPrimaryNavs(internalPrimaryNavLinks);
      setSecondaryNavs(secondaryNavLinks);
    }

    debugger;
    // set current view
    setActiveRoute({
      id: location.pathname
    });
  }, [location.pathname]);

  useEffect(() => {
    setAllProjectsDrop(allProjects);
    // to be mapped
  }, [allProjects]);

  if (location.pathname === AppRoute.ROOT) return;

  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      primaryNavItems={primaryNavs}
      active={activeRoute}
      handleClick={onLinkChange}
      selectOptions={allProjectsDrop}
      withSelect={showProjects}
      secondaryNavItems={secondaryNavs}
    />
  );
};

export default SideNav;
