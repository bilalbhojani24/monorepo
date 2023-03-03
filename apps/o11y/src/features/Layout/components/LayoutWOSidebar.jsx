import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';

export default function LayoutWOSidebar() {
  return (
    <Suspense
      fallback={
        <O11yLoader
          wrapperClassName="h-full"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      }
    >
      <O11yHeader />
      <main className="relative top-16">
        <Outlet />
      </main>
    </Suspense>
  );
}
