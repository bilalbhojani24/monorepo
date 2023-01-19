import React from 'react';
import { TMSectionHeadings } from 'bifrostProxy';
import { number, shapeOf, string } from 'prop-types';

import useImport from './useImport';

const ConfirmImport = (props) => {
  const { projects } = props;
  const { handleConfirmImport } = useImport();

  return (
    <div className="flex justify-center">
      <div className="border-base-100 shadow-base-200 mt-4 w-3/4 rounded-md border-2 p-6">
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
          <div className="text-base-800 my-5 text-sm">
            {projects.length} Projects ready for import. Click on Begin
            Importing to kickstart the process:
          </div>
          {projects.map((project) => (
            <>
              <div className="text-base-900 mb-4 text-sm font-medium">
                {project.name}
              </div>
              <div className="border-base-200 mb-4 border-b" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

ConfirmImport.propTypes = {
  projects: shapeOf({
    id: number,
    name: string,
    suite_mode: number,
  }),
};

ConfirmImport.defaultProps = {
  projects: [],
};

export default ConfirmImport;
