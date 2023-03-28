import React from 'react';
import { Accordion, Badge, Button } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const AuditAccordion = ({ auditDetails }) => (
  <Accordion
    triggerClassName="pt-0"
    triggerContentNode={
      <div className="flex flex-1 items-center justify-between py-3 pl-2">
        <div className="flex flex-col">
          <div className="text-sm font-normal leading-5">
            {auditDetails.title}
          </div>

          <div className="text-base-500 flex items-center">
            <div className="text-sm font-normal leading-5">
              {`Current: ${auditDetails.current} ${auditDetails?.unit}`}
            </div>

            <span className="px-2">•</span>

            <div className="text-sm font-normal leading-5">
              {`Recommended: ${auditDetails.recommended} ${auditDetails?.unit}`}
            </div>
          </div>
        </div>

        <div className="flex min-w-[150px] justify-end">
          <Badge
            hasDot={false}
            hasRemoveButton={false}
            modifier={auditDetails.type}
            isRounded
            size="large"
            text={`${auditDetails.type === 'error' ? 'High' : 'Medium'} Impact`}
            wrapperClassName=""
          />
        </div>
      </div>
    }
    panelContentNode={
      <div className="flex flex-col pl-7 pb-4">
        <div className="mb-2 text-sm font-normal leading-5">
          {auditDetails.subtitle}
        </div>

        <div className="">
          <Button
            size="default"
            fullWidth={false}
            colors="brand"
            variant="minimal"
            onClick={() => {}}
          >
            Learn How to fix it
          </Button>
        </div>
      </div>
    }
    onTriggerClick={() => {}}
  />
);

AuditAccordion.propTypes = {
  auditDetails: PropTypes.shape(PropTypes.any)
};

AuditAccordion.defaultProps = {
  auditDetails: {}
};

export default AuditAccordion;
