import React from 'react';
import { Button, MdClose } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const InlineSlideOverHeader = ({
  children,
  wrapperClassName,
  handleClickDismiss
}) => (
  <div
    className={twClassNames(
      'flex items-center justify-between border-b border-b-base-200 gap-2',
      wrapperClassName
    )}
  >
    {children}
    <Button
      isIconOnlyButton
      icon={<MdClose className="text-xl" />}
      wrapperClassName="shrink-0"
      variant="minimal"
      colors="white"
      onClick={handleClickDismiss}
    />
  </div>
);

InlineSlideOverHeader.displayName = 'InlineSlideOver.Header';
InlineSlideOverHeader.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
  handleClickDismiss: PropTypes.func
};
InlineSlideOverHeader.defaultProps = {
  children: null,
  wrapperClassName: '',
  handleClickDismiss: () => {}
};

export default InlineSlideOverHeader;
