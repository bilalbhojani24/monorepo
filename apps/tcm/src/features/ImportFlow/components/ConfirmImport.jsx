import React from 'react';
import { TMSectionHeadings } from 'bifrostProxy';
import useImport from './useImport';

const ConfirmImport = (props) => {
  const { projects } = props;
  const { handleConfirmImport } = useImport();

  return (
    <div className="flex justify-center">
      <div className="shadow-gray-200 mt-4 w-3/4 rounded-md border-2 border-base-100 p-6">
        <TMSectionHeadings
          title="Preview & Confirm"
          variant="buttons"
          primaryButtonProps={{
            children: 'Import',
            size: 'default',
            onClick: handleConfirmImport,
          }}
        />
        <div>
          <div className="text-sm text-base-800 my-5">
            {projects.length} Projects ready for import. Click on Begin
            Importing to kickstart the process:
          </div>
          {projects.map((project) => (
            <>
              <div className="text-sm font-medium text-base-900 mb-4">
                {project.name}
              </div>
              <div className="border-b border-base-200 mb-4"></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfirmImport;
