import React from 'react';
import {
  DescriptionList,
  DescriptionListBody,
  DescriptionListHeader,
  KeyValue
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import useDeviceDescriptionList from './useDeviceDescriptionList';

const DeviceDescriptionList = () => {
  const { sessionDetails, testDataDescriptionList } =
    useDeviceDescriptionList();

  return (
    <>
      {testDataDescriptionList?.length > 0 && (
        <DescriptionList isCard>
          <DescriptionListHeader
            heading={sessionDetails?.sessionName}
            subHeading={sessionDetails?.package?.bundleId}
          />
          <DescriptionListBody>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {testDataDescriptionList?.map((item) => (
                <div
                  className={twClassNames({
                    'sm:col-span-2': item.id > 4,
                    'sm:col-span-1': item.id <= 4
                  })}
                  key={item.id}
                >
                  <KeyValue
                    label={item.label}
                    value={item.value}
                    valueClassNames="mt-1"
                  />
                </div>
              ))}
            </div>
          </DescriptionListBody>
        </DescriptionList>
      )}
    </>
  );
};

export default DeviceDescriptionList;
