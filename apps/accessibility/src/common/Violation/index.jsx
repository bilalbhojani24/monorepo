import React from 'react';
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
  onRowClick
}) {
  // const activeComponentId = useSelector(getActiveComponentId);
  // const isShowingIssue = useSelector(getIsShowingIssue);
  // const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);

  // const isHalfView = activeComponentId && isShowingIssue;

  const totalCount = violation.nodes.length;
  const impact =
    violation.impact.charAt(0).toUpperCase() +
    violation.impact.slice(1, violation.impact.length);

  // const maxWidthForFullView = isSidebarCollapsed
  //   ? 'calc((100vw - 200px) / 2)'
  //   : 'calc(((100vw - 256px) / 2) - 190px)';

  return (
    <Accordion>
      <AccordionInteractiveHeader
        wrapperClassName={twClassNames(
          'border-t border-base-200 py-2 bg-white',
          {
            'border-0': index === 0
          }
        )}
        title={
          <div className="flex items-center">
            <p
              className="text-base-900 mr-2 truncate text-sm"
              // style={{
              //   maxWidth: `${isHalfView ? maxWidthForFullView : '100%'}`
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
      <AccordionPanel>
        <ComponentList
          nodes={violation.nodes}
          violationId={violation.id}
          activeComponentId={activeComponentId}
          onRowClick={onRowClick}
        />
      </AccordionPanel>
    </Accordion>
  );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any),
  activeComponentId: PropTypes.string,
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired
};

Violation.defaultProps = {
  violation: {},
  activeComponentId: ''
};
