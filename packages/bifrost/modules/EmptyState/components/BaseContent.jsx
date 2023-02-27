import React from 'react';

const BaseContent = ({ mainIcon, title, description }) => {
  return (
    <>
      {mainIcon}
      <h3 className="mt-2 text-sm font-medium text-base-900">{title}</h3>
      <p className="mt-1 text-sm text-base-500">{description}</p>
    </>
  );
};

export default BaseContent;
