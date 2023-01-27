import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

const StepSnippet = ({ index, step, result }) => (
  <div className="border-base-300 mt-2 mb-4 flex flex-row justify-between rounded-md border p-4">
    <div className="border-base-200 text-brand-600 w-8 border-r pr-4 text-base font-semibold">
      {index.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}
    </div>
    <div className="w-full pl-4">
      <div className="mb-2 w-full text-sm">
        <div className="font-medium">Step:</div>
        <div className="text-base-700">{step}</div>
      </div>
      <div className="w-full">
        <div className="font-medium">Result:</div>
        <div className="text-base-700">{result}</div>
      </div>
    </div>
  </div>
);

StepSnippet.propTypes = {
  index: PropTypes.number,
  step: PropTypes.string,
  result: PropTypes.string
};

StepSnippet.defaultProps = {
  index: 1,
  step: '',
  result: ''
};

export default StepSnippet;
