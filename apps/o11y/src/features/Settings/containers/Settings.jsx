import React from 'react';
import { Outlet } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { WRAPPER_GAP_CLASS } from 'constants/common';

import SettingsSidebar from '../components/SettingsSidebar';

export default function Settings() {
  return (
    <div
      className={twClassNames(
        'bg-base-50 flex h-screen flex-col',
        WRAPPER_GAP_CLASS
      )}
    >
      <header className="border-b-base-200 bg-base-50 sticky top-16 border-b py-6 px-8">
        <h1 className="text-2xl font-bold leading-7">Settings</h1>
      </header>
      <section className="flex flex-1 items-start overflow-auto p-8">
        <SettingsSidebar />
        <Outlet />
      </section>
    </div>
  );
}
