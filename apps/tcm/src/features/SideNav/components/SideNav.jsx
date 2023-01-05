import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNavigation } from '@browserstack/bifrost';
import AppRoute from 'const/routes';
import useSideNav from './useSideNav';
import { basePrimaryNavLinks, internalPrimaryNavLinks, secondaryNavLinks } from '../const/navsConst';

const SideNav = () => {
  const location = useLocation();
  const { allProjects } = useSideNav();
  const [primaryNavs, setPrimaryNavs] = useState();
  const [secondaryNavs, setSecondaryNavs] = useState([]);
  const [allProjectsDrop, setAllProjectsDrop] = useState([]);
  const [showProjects, setShowProjects] = useState(true);
  const [activeRoute, setActiveRoute] = useState(null);

  const onLinkChange = (a, b, c) => {
    debugger;
  };

  useEffect(() => {
    if (location.pathname === AppRoute.PROJECTS) {
      // in all projects dashboard
      setShowProjects(false);
      setPrimaryNavs(basePrimaryNavLinks);
      setSecondaryNavs([]);
    } else {
      setShowProjects(true);
      setPrimaryNavs(internalPrimaryNavLinks);
      setSecondaryNavs(secondaryNavLinks);
    }
  }, [location.pathname]);

  useEffect(() => {
    setAllProjectsDrop(allProjects);
    // to be mapped
  }, [allProjects]);

  console.log(location.pathname);
  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      primaryNavItems={primaryNavs}
      active={activeRoute}
      handleClick={onLinkChange}
      selectOptions={allProjects}
      withSelect={showProjects}
      secondaryNavItems={secondaryNavs}
    />
  );
};

export default SideNav;
