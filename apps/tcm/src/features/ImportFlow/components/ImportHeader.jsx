import React from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';
import { string } from 'prop-types';

const ImportHeader = (props) => {
  const { heading } = props;

  return (
    <div className="border-base-200 border-b-2">
      <TMPageHeadings heading={heading} />
    </div>
  );
};

ImportHeader.propTypes = {
  heading: string,
};

ImportHeader.defaultProps = {
  heading: '',
};

export default ImportHeader;
