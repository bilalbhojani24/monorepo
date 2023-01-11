import React from 'react';
import { useSelector } from 'react-redux';
import { TMSectionHeadings } from 'bifrostProxy';

const HeaderDummy = () => {
  const userDetails = useSelector((state) => state.global.user);

  console.log('from header', userDetails);

  return (
    <div className="fixed top-0 z-[99] w-full bg-white pt-5">
      <TMSectionHeadings title="BrowserStack | Test Case Management" />
    </div>
  );
};

export default HeaderDummy;
