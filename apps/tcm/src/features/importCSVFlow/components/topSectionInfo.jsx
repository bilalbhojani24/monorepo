/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdCheckCircle } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';
import { logEventHelper } from 'utils/logEvent';

import { FIRST_SCREEN, SECOND_SCREEN } from '../const/importCSVConstants';
import { setCSVCurrentScreen } from '../slices/importCSVSlice';

import useTextTransformer from './useTextTransformer';

const SingleStep = ({
  title,
  description,
  ctaText,
  redirectTo,
  showPreText
}) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const handleCtaClick = () => {
    if (redirectTo === FIRST_SCREEN) {
      dispatch(
        logEventHelper('TM_CiUpdateFileClicked', {
          project_id: projectId
        })
      );
    }
    if (redirectTo === SECOND_SCREEN) {
      dispatch(
        logEventHelper('TM_CiUpdateMappingLinkClicked', {
          project_id: projectId
        })
      );
    }
    dispatch(setCSVCurrentScreen(redirectTo));
  };
  const { textRef } = useTextTransformer({
    text: description
  });

  return (
    <div className="flex justify-between">
      <div className="w-full max-w-[calc(100%-90px)]">
        <div className="flex">
          <MdCheckCircle className="text-success-600 h-5 w-5" />
          <span className="text-base-800 ml-2 text-sm font-medium">
            {title}
          </span>
        </div>
        <div className="text-base-500 flex whitespace-nowrap pl-7 text-sm font-normal">
          {showPreText && <span className="mr-1">Import Location: </span>}
          <span
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            ref={textRef}
          >
            {description}
          </span>
        </div>
      </div>
      <button
        className="text-brand-600 shrink-0 text-sm font-medium"
        type="button"
        onClick={() => {
          handleCtaClick();
        }}
      >
        {ctaText}
      </button>
    </div>
  );
};

SingleStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  showPreText: PropTypes.bool,
  redirectTo: PropTypes.string
};

SingleStep.defaultProps = {
  title: '',
  description: '',
  ctaText: '',
  redirectTo: '',
  showPreText: false
};

const TopSectionInfo = ({ steps }) => (
  <div className="border-base-300 mb-4 w-4/5 max-w-4xl rounded-lg border bg-white p-4">
    {steps.length &&
      steps.map((step, idx) => (
        <div key={step.title}>
          <div
            className={twClassNames({
              'border-t border-base-300 my-3': idx > 0
            })}
          />
          <SingleStep
            title={step.title}
            icon={step.icon}
            description={step.description}
            ctaText={step.ctaText}
            redirectTo={step.redirectTo}
            showPreText={step?.showPreText}
          />
        </div>
      ))}
  </div>
);

TopSectionInfo.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      node: PropTypes.node
    })
  )
};

TopSectionInfo.defaultProps = {
  steps: []
};

export default TopSectionInfo;
