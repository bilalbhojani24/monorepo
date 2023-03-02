import React from 'react';
import { O11yHeader } from 'common/bifrostProxy';
import Sidebar from 'features/Sidebar';
import { arrayOf, node, oneOfType, string } from 'prop-types';

export default function Dashboard({ children }) {
  return (
    <>
      <O11yHeader />
      <Sidebar />
      <main className="pt-16">{children}</main>
    </>
  );
}

Dashboard.propTypes = {
  children: oneOfType([arrayOf(node), node, string])
};

Dashboard.defaultProps = {
  children: null
};
