import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import BaseContent from './components/BaseContent';
import { ES_VARIANTS } from './const/emptyStateComstants';

import './styles.scss';

const EmptyState = ({
  variant,
  mainIcon,
  title,
  description,
  onClick,
  buttonProps,
}) => {
  const MainWrapper = ({ children }) =>
    variant === ES_VARIANTS[0] ? (
      <div className="text-center">{children}</div>
    ) : (
      <button
        onClick={onClick}
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-base-300 p-12 text-center hover:border-base-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        {children}
      </button>
    );

  return (
    <MainWrapper className="text-center">
      <BaseContent
        mainIcon={mainIcon}
        title={title}
        description={description}
      />
      {variant === ES_VARIANTS[0] && buttonProps && (
        <div className="mt-6">
          <Button onClick={onClick} {...buttonProps} />
        </div>
      )}
    </MainWrapper>
  );
};

EmptyState.propTypes = {
  buttonProps: PropTypes.shape(Button.propTypes),
  description: PropTypes.string,
  mainIcon: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  variant: PropTypes.oneOf(ES_VARIANTS),
};
EmptyState.defaultProps = {
  buttonProps: {},
  description: '',
  mainIcon: null,
  onClick: () => {},
  title: '',
  variant: ES_VARIANTS[0],
};

export default EmptyState;
