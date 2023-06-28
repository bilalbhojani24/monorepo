import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  Badge
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { issueTypes } from 'constants';
import PropTypes from 'prop-types';

import ComponentList from './ComponentList';

export default function Violation({
  violation,
  index,
  activeComponentId,
  activeViolationId,
  onRowClick
}) {
  const [isOpen, setIsOpen] = useState(violation.id === activeViolationId);

  const onAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  const totalCount = violation.nodes.length;
  const impact =
    violation.impact.charAt(0).toUpperCase() +
    violation.impact.slice(1, violation.impact.length);

  return (
    <Accordion>
      <AccordionInteractiveHeader
        wrapperClassName={twClassNames(
          violation.id,
          'border-t border-base-200 py-2 bg-white',
          {
            'border-0': index === 0
          }
        )}
        controller={isOpen}
        onClick={onAccordionClick}
        title={
          <div className="flex items-center">
            <p
              className="text-base-900 mr-2 truncate text-sm"
              // style={{
              //   maxWidth: `${isShowingIssue ? maxWidthForFullView : '100%'}`
              // }}
            >
              {violation.help}
            </p>
            <Badge
              hasDot={false}
              hasRemoveButton={false}
              isRounded
              text={totalCount}
            />
          </div>
        }
        asideContent={
          impact && (
            <Badge
              wrapperClassName={
                violation.impact === 'serious'
                  ? 'bg-[#FCE7F3] text-[#9D174D]'
                  : ''
              }
              hasDot={false}
              hasRemoveButton={false}
              isRounded
              modifier={
                issueTypes.find(({ type }) => type === violation.impact)
                  .modifier
              }
              text={impact}
            />
          )
        }
      />
      <AccordionPanel controller={isOpen}>
        <ComponentList
          nodes={violation.nodes}
          violationId={violation.id}
          activeComponentId={
            activeViolationId === violation.id ? activeComponentId : ''
          }
          onRowClick={onRowClick}
          activeViolationId={activeViolationId}
        />
      </AccordionPanel>
    </Accordion>
  );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any),
  activeComponentId: PropTypes.string,
  index: PropTypes.number.isRequired,
  activeViolationId: PropTypes.string,
  onRowClick: PropTypes.func.isRequired
};

Violation.defaultProps = {
  violation: {},
  activeViolationId: '',
  activeComponentId: ''
};
