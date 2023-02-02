import React from 'react';
import { TMFileUpload, TMSectionHeadings } from 'common/bifrostProxy';

const UploadFile = () => {
  const handleFileUpload = (e) => {
    console.log('inside file upload', e, e.currentTarget.files);
  };

  return (
    <div className="p-6">
      <TMSectionHeadings
        title="Upload CSV/XLS"
        variant="buttons"
        secondaryButtonProps={{ children: 'Proceed' }}
      />
      <div>Upload File:</div>
      <TMFileUpload
        linkText="Upload a file"
        heading="or drag and drop"
        subHeading="CSV & XLS format allowed"
        accept=".csv,.xls"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadFile;
