import React from 'react';
import { Badge, MdExpandLess, MdExpandMore } from '@browserstack/bifrost';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import AuditAccordion from './AuditAccordion';
import useIssuesAudits from './useIssuesAudits';

const IssuesAudits = () => {
  const { sessionData, auditsToBeShown, showAllAutdits, setShowAllAudits } =
    useIssuesAudits();

  return (
    <div className="mb-8">
      <div className="mb-3 flex flex-col rounded-lg bg-white shadow">
        <div className="flex items-center px-6 py-4">
          <div className="mr-1 text-lg font-semibold leading-6">
            Issues Detected
          </div>

          <div className="">
            <Badge
              hasDot={false}
              hasRemoveButton={false}
              modifier="error"
              isRounded
              size="large"
              text={sessionData?.audits?.failedAudits?.length}
              wrapperClassName=""
            />
          </div>
        </div>

        {auditsToBeShown?.length === 0 && (
          <div className="pb-6 pt-2 text-center text-lg font-semibold">
            No Issues Detected!
          </div>
        )}

        {auditsToBeShown?.length > 0 && (
          <div className="border-base-300 border-t">
            {auditsToBeShown.map((audit) => (
              <div className="border-base-300 border-b px-6">
                <AuditAccordion auditDetails={audit} />
              </div>
            ))}
          </div>
        )}

        {sessionData?.audits?.failedAudits?.length > 3 && (
          <div
            role="presentation"
            className="flex cursor-pointer items-center justify-center p-2 text-base"
            onClick={() => {
              setShowAllAudits((prev) => !prev);

              mcpAnalyticsEvent('csptReportSummaryShowAllClick');
            }}
          >
            <div className="mr-1 text-xl">
              {showAllAutdits ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            <div className="font-medium leading-6">{`Show ${
              showAllAutdits ? 'Less' : 'More'
            }`}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col rounded-lg bg-white px-6 py-4 shadow">
        <div className="text-lg font-semibold leading-6">
          <div className="mb-4 flex items-center">
            <div className="mr-1 text-lg font-semibold leading-6">
              Passed Audits
            </div>

            <div className="">
              <Badge
                hasDot={false}
                hasRemoveButton={false}
                modifier="success"
                isRounded
                size="large"
                text={sessionData?.audits?.passedAudits?.metrics?.length}
                wrapperClassName=""
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-base font-normal leading-6">
              {sessionData?.audits?.passedAudits?.message}
            </div>

            {sessionData?.audits?.passedAudits?.metrics?.length > 0 && (
              <div className="mt-3 flex flex-wrap">
                {sessionData?.audits?.passedAudits?.metrics.map((metric) => (
                  <Badge
                    hasDot={false}
                    hasRemoveButton={false}
                    modifier="base"
                    isRounded
                    size="large"
                    text={metric}
                    wrapperClassName="mr-2 mb-2"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesAudits;
