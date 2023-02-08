import React from 'react';
import propTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { MdOutlineInsertPhoto } from '../Icon';
import Loader from '../Loader/index';

import './styles.scss';

const FileUpload = ({
  linkText,
  heading,
  subHeading,
  isUploading,
  multiple,
  label,
  onChange,
  accept,
  wrapperClassName,
  icon
}) => {
  const onChangeHandler = (event) => {
    onChange(event);
  };

  return (
    <div
      className={twClassNames(
        'border-base-300 w-full rounded-md border-2 border-dashed text-center flex items-center justify-center',
        wrapperClassName,
        {
          'hover:bg-base-50 active:border-brand-500': !isUploading,
          'cursor-not-allowed': isUploading
        }
      )}
    >
      <div className="py-5 px-6">
        {isUploading ? (
          <>
            <Loader wrapperStyle="text-base-300 h-8 w-8 fill-base-600 mx-auto" />
            <p className="text-base-600 mt-2 text-sm font-medium leading-5">
              {heading}
            </p>
          </>
        ) : (
          <label htmlFor={label}>
            {icon}
            <div className="focus-within:bg-brand-200 mt-1 flex items-center justify-center gap-1">
              <p className="text-brand-600 cursor-pointer text-xs font-medium leading-4">
                {linkText}
              </p>
              <p className="text-base-600 text-sm font-medium leading-5">
                {heading}
              </p>
            </div>
            <input
              id={label}
              type="file"
              className="hidden"
              onChange={(e) => onChangeHandler(e)}
              multiple={multiple}
              accept={accept}
            />
            <p className="text-base-500 text-xs font-normal leading-4">
              {subHeading}
            </p>
          </label>
        )}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  linkText: propTypes.string,
  heading: propTypes.string,
  subHeading: propTypes.string,
  isUploading: propTypes.bool,
  label: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  multiple: propTypes.bool,
  accept: propTypes.string.isRequired,
  wrapperClassName: propTypes.string,
  icon: propTypes.node
};
FileUpload.defaultProps = {
  linkText: '',
  heading: '',
  subHeading: '',
  isUploading: false,
  multiple: false,
  wrapperClassName: '',
  icon: <MdOutlineInsertPhoto className="text-base-500 mx-auto h-6 w-6" />
};

export default FileUpload;
