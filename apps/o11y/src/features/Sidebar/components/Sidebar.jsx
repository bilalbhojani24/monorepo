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
      wrapperClassName="mt-16 bg-white"
      sidebarHeader={
        <div className="w-full p-2">
          <p>Sidebar</p>
        </div>
      }
    />
  );
}
