import React from 'react';
import { twClassNames } from '@browserstack/utils';
import CommonIllustration from 'assets/illustrations/common_illustration.svg';
import NotFoundImg from 'assets/illustrations/no_data_found.svg';
import PropTypes from 'prop-types';

export default function EmptyPage({ text, wrapperClass, isUpComing }) {
  return (
    <div
      className={twClassNames(
        'flex h-full w-full flex-col items-center justify-center',
        wrapperClass
      )}
    >
      <img
        src={isUpComing ? CommonIllustration : NotFoundImg}
        alt="Coming Soon"
      />
      <p className="text-base-600 mt-2 text-xl">{text}</p>
    </div>
  );
}
EmptyPage.propTypes = {
  text: PropTypes.string,
  wrapperClass: PropTypes.string,
  isUpComing: PropTypes.bool
};
EmptyPage.defaultProps = {
  text: 'No data found',
  wrapperClass: '',
  isUpComing: false
};
