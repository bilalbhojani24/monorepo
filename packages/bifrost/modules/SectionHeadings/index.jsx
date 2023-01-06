import React from 'react';
import PropTypes from 'prop-types';
import { SH_VARIANTS } from './const/sectionHeadingsConstants';
import Tabs from '../Tabs';
import Badge from '../Badge';
import Button from '../Button';
import InputWButton from '../InputWButton';
import DropDown from '../Dropdown';
import classNames from 'classnames';
import './styles.scss';

const SectionHeadings = ({
  badgeProps,
  description,
  dropdownProps,
  inputProps,
  primaryButtonProps,
  secondaryButtonProps,
  subTitle,
  tabsProps,
  title,
  variant
}) => {
  return (
    <div className={classNames('', { 'border-b border-base-200 pb-5': !tabsProps })}>
      <div className="border-base-200 sm:flex sm:justify-between sm:items-baseline">
        <div className="w-full" role="contentinfo">
          {(subTitle || title) && (
            <div className="flex flex-wrap items-baseline">
              {title && <h3 className="text-lg font-medium leading-6 text-base-900">{title}</h3>}
              {subTitle && <p className="ml-2 mt-1 truncate text-sm text-base-500">{subTitle}</p>}
            </div>
          )}

          {description && (
            <p className={classNames('mt-2 max-w-4xl text-sm text-base-500', { 'mb-2': !!tabsProps })}>{description}</p>
          )}
        </div>
        {variant === SH_VARIANTS[1] && (
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            {primaryButtonProps && <Button {...primaryButtonProps} />}
            {secondaryButtonProps && <Button wrapperClassName="ml-3" {...secondaryButtonProps} />}
          </div>
        )}
        {variant === SH_VARIANTS[2] && <>{inputProps && <InputWButton {...inputProps} />}</>}
        {variant === SH_VARIANTS[3] && (
          <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
            {badgeProps && <Badge {...badgeProps} />}
            {dropdownProps && (
              <div className="ml-3 flex">
                <DropDown {...dropdownProps} />
              </div>
            )}
          </div>
        )}
      </div>
      {tabsProps && (
        <div
          className={classNames({
            '-mt-2': variant !== SH_VARIANTS[3] && variant !== SH_VARIANTS[0] && !description
          })}
        >
          <Tabs {...tabsProps} />
        </div>
      )}
    </div>
  );
};

SectionHeadings.propTypes = {
  badgeProps: PropTypes.shape(Badge.propTypes),
  description: PropTypes.string,
  dropdownProps: PropTypes.shape(DropDown.propTypes),
  inputProps: PropTypes.shape(InputWButton.propTypes),
  primaryButtonProps: PropTypes.shape(Button.propTypes),
  secondaryButtonProps: PropTypes.shape(Button.propTypes),
  subTitle: PropTypes.string,
  tabsProps: PropTypes.shape(Tabs.propTypes),
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(SH_VARIANTS)
};

SectionHeadings.defaultProps = {
  badgeProps: null,
  description: '',
  dropdownProps: null,
  inputProps: null,
  primaryButtonProps: null,
  secondaryButtonProps: null,
  subTitle: '',
  tabsProps: null,
  variant: SH_VARIANTS[0]
};

export default SectionHeadings;
