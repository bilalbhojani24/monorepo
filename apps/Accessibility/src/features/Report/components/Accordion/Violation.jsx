import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames';
import { setOpenAccordionId } from 'features/Report/slice/appSlice';
import { getOpenAccordionId } from 'features/Report/slice/selector';
import PropTypes from 'prop-types';
// import { ArrowDropDownIcon, ArrowDropUpIcon } from 'trike/Icons';
// import Lozenge from 'trike/Lozenge';
import { handleClickByEnterOrSpace } from 'utils/helper';

import ComponentList from './ComponentList';

export default function Violation({ violation }) {
  const dispatch = useDispatch();
  const openAccordionId = useSelector(getOpenAccordionId);
  const isOpen = openAccordionId === violation.id;

  const totalCount = violation.nodes.length;
  const modifier =
    violation.impact === 'serious' || violation.impact === 'critical'
      ? 'error'
      : 'warn';
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
    <div
      key={violation.id}
      // className={classNames('violations', {
      //   'violations--active': isOpen
      // })}
    >
      <div
        className="violation__header"
        tabIndex={0}
        role="button"
        onKeyDown={(e) =>
          handleClickByEnterOrSpace(e, () => updateOpenViolation())
        }
        onClick={() => updateOpenViolation()}
        aria-label={violation.help}
      >
        <p className="violation__title">
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {violation.help} (<span>{totalCount}</span>)
        </p>
        {impact && (
          <div className="violation__icon">
            <Lozenge text={impact} modifier={modifier} type="subtle" />
          </div>
        )}
      </div>
      {isOpen && (
        <ComponentList nodes={violation.nodes} violationId={violation.id} />
      )}
    </div>
  );
}

Violation.propTypes = {
  violation: PropTypes.objectOf(PropTypes.any)
};

Violation.defaultProps = {
  violation: {}
};
