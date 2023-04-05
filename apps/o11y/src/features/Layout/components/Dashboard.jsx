import React from 'react';
import { O11yHeader } from 'common/bifrostProxy';
import Sidebar from 'features/Sidebar';
import { arrayOf, node, oneOfType, string } from 'prop-types';

export default function Dashboard({ children }) {
  return (
    <>
      <O11yHeader />
      <main className="flex">
        <Sidebar />
        <main className="bg-base-50 flex flex-1 flex-col">{children}</main>
      </main>
    </>
  );
}

Dashboard.propTypes = {
  children: oneOfType([arrayOf(node), node, string])
};

Dashboard.defaultProps = {
  children: null
};
