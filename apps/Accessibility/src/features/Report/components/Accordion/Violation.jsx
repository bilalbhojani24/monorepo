import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Badge } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { issueTypes } from 'constants';
import { setOpenAccordionId } from 'features/Report/slice/appSlice';
import { getOpenAccordionId } from 'features/Report/slice/selector';
import PropTypes from 'prop-types';

import ComponentList from './ComponentList';

export default function Violation({ violation, index }) {
  const dispatch = useDispatch();
  const openAccordionId = useSelector(getOpenAccordionId);
  const isOpen = openAccordionId === violation.id;

  const totalCount = violation.nodes.length;
  const impact =
    violation.impact.charAt(0).toUpperCase() +
    violation.impact.slice(1, violation.impact.length);

  const updateOpenViolation = () => {
    if (isOpen) {
      dispatch(setOpenAccordionId(''));
    } else {
      dispatch(setOpenAccordionId(violation.id));
    }
  };

  return (
    <Accordion
      triggerClassName={twClassNames(
        'flex w-full bg-white py-3 px-6 border-t',
        {
          'border-0': index === 0
        }
      )}
      triggerContentNode={
        <div className="flex w-full cursor-pointer items-center justify-between bg-white">
          <div className="ml-2 flex items-center">
            <p className="text-base-900 mr-2 text-sm">{violation.help}</p>
            <div>
              <Badge
                hasDot={false}
                hasRemoveButton={false}
                isRounded
                text={totalCount}
              />
            </div>
          </div>
          {impact && (
            <Badge
              hasDot={false}
              hasRemoveButton={false}
              isRounded
              text={impact}
              modifier={
                issueTypes.find(({ type }) => type === violation.impact)
                  .modifier
              }
            />
          )}
        </div>
      }
      panelContentNode={
        <ComponentList nodes={violation.nodes} violationId={violation.id} />
      }
      onTriggerClick={updateOpenViolation}
      onChevronClick={updateOpenViolation}
    />
  );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number.isRequired
};

Violation.defaultProps = {
  violation: {}
};
