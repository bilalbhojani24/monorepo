import React from 'react';

const FolderInputWButton = ({
  label,
  text,
  icon
  // firstCta,
  // secondCta,
}) => (
  <div className="my-4">
    <div className="text-base-500 mb-2 text-sm font-medium">{label}</div>
    <div className="border-base-100 flex items-center justify-between rounded-md border-2 p-2">
      <span>
        <span>{icon}</span>
        <span className="text-base-900 ml-2 text-sm">{text}</span>
      </span>
      {/* <span className="text-brand-500 text-sm font-medium">
        <span className="cursor-pointer" onClick={firstCtaClick}>
          {firstCta}
        </span>
        <span className="text-base-300 mx-2"> | </span>
        <span className="cursor-pointer">{secondCta}</span>
      </span> */}
    </div>
    {/*<div className="text-base-500 text-sm font-normal">*/}
    {/*  Update your folder location where you want to import the test cases*/}
    {/*</div>*/}
  </div>
);

export default FolderInputWButton;
