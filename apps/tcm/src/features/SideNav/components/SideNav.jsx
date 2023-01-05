import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNavigation } from '@browserstack/bifrost';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppRoute from 'const/routes';

const SideNav = () => {
  const location = useLocation();
  const [primaryNavs, setPrimaryNavs] = useState([
    {
      id: AppRoute.PROJECTS,
      label: 'All Projects',
      activeIcon: HomeOutlinedIcon,
      inActiveIcon: HomeOutlinedIcon,
      path: AppRoute.PROJECTS
    },
    {
      id: 'settings',
      label: 'Settings',
      activeIcon: HomeOutlinedIcon,
      inActiveIcon: HomeOutlinedIcon,
      path: AppRoute.TEST_RUNS
    },
    {
      id: 'documentation',
      label: 'Documentation',
      activeIcon: HomeOutlinedIcon,
      inActiveIcon: HomeOutlinedIcon
    }
  ]);
  const [secondaryNavs, setSecondaryNavs] = useState([]);
  const [showProjects, setShowProjects] = useState(false);

  const selectOptions = [
    { label: 'Project 1', value: 'p1' },
    { label: 'Project 2', value: 'p2' },
    { label: 'Project 3', value: 'p3' }
  ];

  const onLinkChange = (a, b, c) => {
    debugger;
  };

  useEffect(() => {}, [location.pathname]);

  console.log(location.pathname);
  return (
    <SidebarNavigation
      wrapperClass="mt-16"
      primaryNavItems={primaryNavs}
      active={primaryNavs[0]}
      handleClick={onLinkChange}
      selectOptions={selectOptions}
      withSelect={showProjects}
      secondaryNavItems={secondaryNavs}
    />
  );
};

export default SideNav;
