import React from 'react';
import { MdCheckCircle } from '@browserstack/bifrost';
import classNames from 'classnames';
import { TMBadge } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

const FormatCard = ({ title, description, isSelected, badgeText, onClick }) => {
  const onClickHandler = () => {
    onClick(title);
  };
  return (
    <div
      className={classNames(
        'flex-1 rounded-md border p-4',
        isSelected
          ? 'border-brand-600 ring-2 ring-brand-600'
          : 'border-base-300'
      )}
      tabIndex={0}
      onClick={onClickHandler}
      role="button"
      onKeyUp={(e) => onSubmitKeyHandler(e, onClickHandler)}
    >
      <div className="mb-2 flex justify-between text-sm font-medium">
        <div>
          {title}
          {badgeText && (
            <TMBadge
              isRounded
              text={badgeText}
              modifier="warn"
              size="basic"
              wrapperClassName="ml-2"
            />
          )}
        </div>
        {isSelected && <MdCheckCircle className="text-brand-600 text-lg" />}
      </div>
      <div className="text-base-500 text-sm">{description}</div>
    </div>
  );
};

FormatCard.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  badgeText: PropTypes.string,
  isSelected: PropTypes.bool
};

FormatCard.defaultProps = {
  onClick: () => {},
  title: '',
  description: '',
  badgeText: '',
  isSelected: false
};

export default FormatCard;
