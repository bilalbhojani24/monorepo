import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { issueTypes } from 'constants';
import { setOpenAccordionId } from 'features/Report/slice/appSlice';
import { getOpenAccordionId } from 'features/Report/slice/selector';
import { ASAccordion, ASBadge } from 'middleware/bifrost';
import PropTypes from 'prop-types';

import ComponentList from './ComponentList';

export default function Violation({ violation, index, isFullWidth }) {
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
    <ASAccordion
      triggerClassName={twClassNames(
        'flex w-full bg-white py-3 px-6 border-t',
        {
          'border-0': index === 0
        }
      )}
      triggerContentNode={
        <div className="flex w-full cursor-pointer items-center justify-between bg-white">
          <div className="ml-2 flex">
            <p className="text-base-900 mr-2 text-sm">{violation.help}</p>
            <ASBadge
              hasDot={false}
              hasRemoveButton={false}
              isRounded={false}
              text={totalCount}
            />
          </div>
          {impact && (
            <ASBadge
              hasDot={false}
              hasRemoveButton={false}
              isRounded={false}
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
        <ComponentList
          nodes={violation.nodes}
          violationId={violation.id}
          isFullWidth={isFullWidth}
        />
      }
      onTriggerClick={updateOpenViolation}
      onChevronClick={updateOpenViolation}
    />
  );

  // return (
  //   <div
  //     key={violation.id}
  //     // className={classNames('violations', {
  //     //   'violations--active': isOpen
  //     // })}
  //   >
  //     <div
  //       className="violation__header"
  //       tabIndex={0}
  //       role="button"
  //       onKeyDown={(e) =>
  //         handleClickByEnterOrSpace(e, () => updateOpenViolation())
  //       }
  //       onClick={() => updateOpenViolation()}
  //       aria-label={violation.help}
  //     >
  //       <p className="violation__title">
  //         {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
  //         {violation.help} (<span>{totalCount}</span>)
  //       </p>
  //       {impact && (
  //         <div className="violation__icon">
  //           <Lozenge text={impact} modifier={modifier} type="subtle" />
  //         </div>
  //       )}
  //     </div>
  //     {isOpen && (
  //       <ComponentList nodes={violation.nodes} violationId={violation.id} />
  //     )}
  //   </div>
  // );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number.isRequired
};

Violation.defaultProps = {
  violation: {}
};
