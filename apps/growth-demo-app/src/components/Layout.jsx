import React from 'react';
import { Link } from 'react-router-dom';

const LINK_CLASS_NAME = 'bg-brand-500 p-4 text-white rounded-md';

const Layout = () => (
  <>
    <div className="flex flex-col items-center">
      <h1>Growth Demo App</h1>
      <p>Please click on below buttons to redirect to particular feature</p>
    </div>
    <div className="flex space-x-3 p-5">
      <Link to="/freshchat" className={LINK_CLASS_NAME}>
        Freshchat
      </Link>
    </div>
  </>
);

export default Layout;
