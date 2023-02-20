import React, { useEffect } from 'react';
import { AddBoxOutlinedIcon, DeleteOutlineOutlinedIcon } from 'assets/icons';
import { TMButton, TMRichTextEditor } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { stepTemplate } from '../const/addTestCaseConst';

const StepComponent = ({ data, onChange, errorText }) => {
  const onChangeHandler = (index, key, value) => {
    onChange(
      data.map((item, idx) =>
        idx !== index
          ? item
          : {
              ...item,
              [key]: value
            }
      )
    );
  };

  const addNewStep = () => {
    onChange([...data, stepTemplate]);
  };

  const deleteStep = (index) => {
    if (data.length === 1) return;
    onChange(data.filter((_item, idx) => index !== idx));
  };

  const shortKeyChecker = (e) => {
    if (e.ctrlKey && (e.key === 'd' || e.key === 'D')) addNewStep();
  };

  useEffect(() => {
    window.addEventListener('keydown', shortKeyChecker);
    return () => window.removeEventListener('keydown', shortKeyChecker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      {data.map((item, index) => (
        <SingleStepComponent
          index={index}
          data={item}
          errorText={errorText}
          //   key={`${JSON}`}
          isDeleteDisabled={data.length === 1}
          onDelete={deleteStep}
          onChange={onChangeHandler}
        />
      ))}
      <div className="mt-4 w-full">
        {/* <TMTooltip
          actionObject={null}
          description="Add Step (Ctrl + D)"
          placementSide="bottom"
          theme="dark"
        > */}
        <TMButton
          onClick={addNewStep}
          colors="white"
          size="extra-small"
          icon={<AddBoxOutlinedIcon className="!h-4 !w-5" />}
        >
          Add Another Step
        </TMButton>
        {/* </TMTooltip> */}
      </div>
    </div>
  );
};

const SingleStepComponent = ({
  index,
  data,
  onChange,
  onDelete,
  isDeleteDisabled,
  errorText
}) => (
  <div className="mt-4 w-full">
    <div className="mb-2 flex items-center">
      <div className="mr-4">Step {index + 1}</div>
      <div className="border-base-300 flex-1 border-b" />
      {!isDeleteDisabled && (
        <TMButton
          onClick={() => onDelete(index)}
          colors="white"
          size="extra-small"
          icon={<DeleteOutlineOutlinedIcon className="!h-4 !w-5" />}
        >
          Delete
        </TMButton>
      )}
    </div>
    <div className="mb-2 flex gap-4">
      <div className="flex-1">
        <TMRichTextEditor
          value={data?.step}
          id={`step-rte-tc-${index}`}
          label="Step"
          placeholder="Write step"
          height={200}
          onChange={(val) => onChange(index, 'step', val)}
          // onAssetUpload={imageUploadRTEHelper}
        />
        {errorText && data?.step === '' && (
          <p className="text-danger-600 mt-2 text-sm">{errorText}</p>
        )}
      </div>
      <div className="flex-1">
        <TMRichTextEditor
          label="Result"
          id={`result-rte-tc-${index}`}
          placeholder="Expected result"
          height={200}
          value={data?.expected_result}
          onChange={(val) => onChange(index, 'expected_result', val)}
          // onAssetUpload={imageUploadRTEHelper}
        />
        {errorText && data?.expected_result === '' && (
          <p className="text-danger-600 mt-2 text-sm">{errorText}</p>
        )}
      </div>
    </div>
  </div>
);

SingleStepComponent.propTypes = {
  data: PropTypes.shape({
    step: PropTypes.string,
    expected_result: PropTypes.string
  }),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  isDeleteDisabled: PropTypes.bool,
  index: PropTypes.number,
  errorText: PropTypes.string
};
SingleStepComponent.defaultProps = {
  data: [],
  onChange: () => {},
  onDelete: () => {},
  isDeleteDisabled: false,
  index: 0,
  errorText: ''
};

StepComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.string,
      expected_result: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  errorText: PropTypes.string
};
StepComponent.defaultProps = {
  data: [],
  onChange: () => {},
  errorText: ''
};

export default StepComponent;
