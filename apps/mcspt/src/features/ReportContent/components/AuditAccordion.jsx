import React from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  Badge,
  Button
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { useAuditAccordion } from './useAuditAccordion';

const AuditAccordion = ({ auditDetails }) => {
  const { isAuditAccordionOpen, accordionOpened, learnHowToFix } =
    useAuditAccordion(auditDetails);

  return (
    <Accordion>
      <AccordionInteractiveHeader
        controller={isAuditAccordionOpen}
        wrapperClassName="px-0"
        title={
          <span className="flex font-normal">
            <span className="text-sm leading-5">{auditDetails.title}</span>
          </span>
        }
        asideContent={
          <div className="flex min-w-[150px] justify-end">
            <Badge
              hasDot={false}
              hasRemoveButton={false}
              modifier={auditDetails.type}
              isRounded
              size="large"
              text={`${
                auditDetails.type === 'error' ? 'High' : 'Medium'
              } Impact`}
              wrapperClassName=""
            />
          </div>
        }
        onClick={accordionOpened}
      >
        <div className="text-base-500 flex items-center">
          <div className="text-sm font-normal leading-5">
            {`Current: ${auditDetails.current} ${auditDetails?.unit}`}
          </div>

          <span className="px-2">•</span>

          <div className="text-sm font-normal leading-5">
            {`Recommended: ${auditDetails.recommended} ${auditDetails?.unit}`}
          </div>
        </div>
      </AccordionInteractiveHeader>

      <AccordionPanel controller={isAuditAccordionOpen}>
        <div className="flex flex-col pb-4 pl-7">
          <div className="mb-2 text-sm font-normal leading-5">
            {auditDetails.subtitle}
          </div>

          <div className="">
            <Button
              size="default"
              fullWidth={false}
              colors="brand"
              variant="minimal"
              onClick={learnHowToFix}
            >
              Learn How to fix it
            </Button>
          </div>
        </div>
      </AccordionPanel>
    </Accordion>
  );
};

AuditAccordion.propTypes = {
  auditDetails: PropTypes.shape(PropTypes.any)
};

AuditAccordion.defaultProps = {
  auditDetails: {}
};

export default AuditAccordion;
