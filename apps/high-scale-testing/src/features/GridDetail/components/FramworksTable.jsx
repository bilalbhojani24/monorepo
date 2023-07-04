import React from 'react';
import { Badge, MdContentCopy } from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import frameWorkIcons from 'constants/frameworkIcons';
import PropTypes from 'prop-types';

const FrameworksTable = ({ containerClassName, copyBtnCbFn, frameworks }) => (
  <div className={containerClassName}>
    <p className="text-base-900 text-lg font-medium leading-6">
      Framework URLs
    </p>
    <div className="bg-white pt-4">
      {frameworks.map((framework) => (
        <div
          className="border-base-200 flex flex-row items-center border-b py-3"
          key={framework?.name}
        >
          <div className="flex flex-row items-center">
            {frameWorkIcons[framework?.name]}
            <div className="ml-2 w-52">
              <p className="text-base-500 text-base font-normal">
                {framework?.name}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start">
            {framework?.url.length ? (
              <>
                <p className="text-base-900 mr-4 text-base font-normal">
                  {framework?.url}
                  {framework?.name === 'Selenium' && '/wd/hub'}
                </p>

                <CopyButton
                  cb={() => copyBtnCbFn(framework?.name.toLowerCase())}
                  copyValue={framework?.url}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </>
            ) : (
              <Badge
                disabled
                hasDot={false}
                hasRemoveButton={false}
                isRounded
                text={framework.status}
                modifier="info"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

FrameworksTable.propTypes = {
  containerClassName: PropTypes.string.isRequired,
  copyBtnCbFn: PropTypes.func.isRequired,
  frameworks: PropTypes.shape([]).isRequired
};

export default FrameworksTable;
