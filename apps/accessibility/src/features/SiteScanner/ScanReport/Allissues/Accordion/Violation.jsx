import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  Badge
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { issueTypes } from 'constants';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
import { setOpenAccordionId } from 'features/SiteScanner/ScanReport/slice/appSlice';
import {
  getActiveComponentId,
  getIsShowingIssue
} from 'features/SiteScanner/ScanReport/slice/selector';
import PropTypes from 'prop-types';
import { getDashboardWidth } from 'utils';

import ComponentList from './ComponentList';

export default function Violation({ violation, index }) {
  const dispatch = useDispatch();
  const activeComponentId = useSelector(getActiveComponentId);
  const isShowingIssue = useSelector(getIsShowingIssue);
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);

  const isHalfView = activeComponentId && isShowingIssue;

  const totalCount = violation.nodes.length;
  const impact =
    violation.impact.charAt(0).toUpperCase() +
    violation.impact.slice(1, violation.impact.length);

  const updateOpenViolation = () => {
    dispatch(setOpenAccordionId(violation.id));
  };

  const maxWidthForFullView = isSidebarCollapsed
    ? 'calc((100vw - 200px) / 2)'
    : `calc(((${getDashboardWidth}) / 2) - 190px)`;

  return (
    <Accordion>
      <AccordionInteractiveHeader
        wrapperClassName={twClassNames(
          'border-t border-base-200 bg-white py-2',
          {
            'border-0': index === 0
          }
        )}
        onClick={updateOpenViolation}
        title={
          <div className="flex items-center">
            <p
              className="text-base-900 mr-2 truncate text-sm"
              style={{
                maxWidth: `${isHalfView ? maxWidthForFullView : '100%'}`
              }}
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
        <ComponentList nodes={violation.nodes} violationId={violation.id} />
      </AccordionPanel>
    </Accordion>
  );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number.isRequired
};

Violation.defaultProps = {
  violation: {}
};
