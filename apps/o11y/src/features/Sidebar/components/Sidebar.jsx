import React from 'react';
import {
  // MdOutlineAddBox,
  // SidebarHeader,
  // SidebarItem,
  SidebarNavigation
} from '@browserstack/bifrost';

export default function Sidebar() {
  return (
    <SidebarNavigation
      wrapperClassName="md:sticky h-screen bg-white py-5 px-2 w-64 flex-none"
      sidebarHeader={
        <div className="w-full">
          <p>Sidebar</p>
        </div>
      }
    />
  );
}
