import React from 'react';
import { Badge, MdExpandLess, MdExpandMore } from '@browserstack/bifrost';

import AuditAccordion from './AuditAccordion';
import useIssuesAudits from './useIssuesAudits';

const IssuesAudits = () => {
  const { sessionData, auditsToBeShown, showAllAutdits, setShowAllAudits } =
    useIssuesAudits();

  return (
    <div className="mb-10">
      <div className="mb-3 flex flex-col rounded-lg bg-white shadow">
        <div className="border-base-300 flex items-center border-b py-4 px-6">
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

        {auditsToBeShown?.length > 0 &&
          auditsToBeShown.map((audit) => (
            <div className="border-base-300 border-b px-6">
              <AuditAccordion auditDetails={audit} />
            </div>
          ))}

        {sessionData?.audits?.failedAudits?.length > 3 && (
          <div
            role="presentation"
            className="flex cursor-pointer items-center justify-center p-2 text-base"
            onClick={() => {
              setShowAllAudits((prev) => !prev);
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

      <div className="flex flex-col rounded-lg bg-white py-4 px-6 shadow">
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
                text={sessionData?.audits?.passedAudits?.count}
                wrapperClassName=""
              />
            </div>
          </div>

          <div className="flex">
            <span className="text-base font-normal leading-6">
              {sessionData?.audits?.passedAudits?.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesAudits;
