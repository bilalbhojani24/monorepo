import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import ROUTES from 'constants/routes';
import HSTHeader from 'features/HSTHeader/component';

const LayoutWOSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useMountEffect(() => {
    if (location.pathname === ROUTES.ROOT) {
      navigate(ROUTES.AUTOMATION_CONSOLE);
    }

    document.getElementById('root').classList.add('bg-base-50');
    document.getElementById('root').classList.add('h-screen');
  });

  return (
    <>
      <HSTHeader />
      <main className="bg-base-50 flex flex-col">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutWOSidebar;
