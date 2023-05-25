import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge, MdContentCopy, MdLink } from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import { setGridId } from 'features/GridConsole/slices/selector';

import { useGridDetailById } from './useGridDetailById';

const GridOverview = () => {
  const id = useSelector(setGridId);

  const { fetchGridDataByIdFromAPI, gridData } = useGridDetailById();

  useEffect(() => {
    if (id) fetchGridDataByIdFromAPI(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!Object.keys(gridData).length) {
    return <></>;
  }

  const {
    gridId,
    name,
    user,
    gridVersion,
    cluster,
    status,
    runningTests,
    queuedTests,
    connected,
    frameworkUrls
  } = gridData;
  const GridDetailItem = (title, value) => (
    <div>
      <p className="text-base-500 text-sm font-normal">{title}</p>
      <p className="text-base-900 text-sm font-normal">{value}</p>
    </div>
  );

  return (
    <>
      <div className="px-6 pt-6">
        <div className="border-base-200 rounded-lg border bg-white p-6">
          <p className="text-base-900 text-lg font-medium leading-6">
            Grid Details
          </p>

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-4">
            {GridDetailItem('Grid Name', name)}
            {GridDetailItem(
              'Status',
              <Badge
                disabled
                hasDot={false}
                hasRemoveButton={false}
                // eslint-disable-next-line react/jsx-boolean-value
                isRounded={true}
                text={status}
                modifier="success"
              />
            )}
            {GridDetailItem('Grid ID', gridId)}
            {GridDetailItem('Connected', connected)}
            {GridDetailItem('Created by', user.fullName)}
            {GridDetailItem('Running Tests', runningTests)}
            {GridDetailItem('Cluster ID', cluster.id)}
            {GridDetailItem('Browsers Used', 'Browsers')}
            {GridDetailItem('Cluster Name', cluster.name)}
            {GridDetailItem('Queued Tests', queuedTests)}
            {GridDetailItem('Grid version', gridVersion)}
          </div>
        </div>
      </div>

      {frameworkUrls.length && (
        <div className="p-6">
          <div className="border-base-200 rounded-lg border bg-white p-6">
            <p className="text-base-900 text-lg font-medium leading-6">
              Framework URLs
            </p>
            <div className="bg-white pt-4">
              {frameworkUrls.map((fwUrl) => (
                <div
                  className="border-base-200 flex flex-row items-center border-b py-3"
                  key={fwUrl.fwName}
                >
                  <div className="flex flex-row items-center">
                    <MdLink className="text-base-500 mr-2" />
                    <div className="w-52">
                      <p className="text-base-900 text-sm font-normal">
                        {fwUrl.fwName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-start">
                    {fwUrl.url.length ? (
                      <>
                        <p className="text-base-900 mr-4 text-sm font-normal">
                          http://35.244.48.186:4444/wd/hub
                        </p>

                        <CopyButton
                          copyValue={fwUrl.url}
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
                        // eslint-disable-next-line react/jsx-boolean-value
                        isRounded={true}
                        text={fwUrl.status}
                        modifier="success"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridOverview;
