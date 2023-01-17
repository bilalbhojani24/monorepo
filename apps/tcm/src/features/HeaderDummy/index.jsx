/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { Link } from 'react-router-dom';
import AppRoute from 'const/routes';

const HeaderDummy = () => (
  <div className="border-base-300 fixed top-0 z-[99] h-16 w-full border-b bg-white pt-5">
    <Link to={AppRoute.ROOT}>BrowserStack | Test Case Management</Link>
  </div>
);

export default HeaderDummy;
