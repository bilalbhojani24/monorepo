import React from 'react';
import { TMPageHeadings } from 'bifrostProxy';

const ImportHeader = (props) => {
  const { heading } = props;

  return (
    <div className="border-b-2 border-base-200">
      <TMPageHeadings heading={heading} />
    </div>
  );
};

export default ImportHeader;
