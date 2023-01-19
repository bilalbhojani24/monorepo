import React from 'react';
import { TMPageHeadings } from 'bifrostProxy';
import { arrayOf, func, shape, string } from 'prop-types';

const ImportHeader = (props) => {
  const { heading, actions } = props;

  return (
    <div className="border-base-200 border-b-2">
      <TMPageHeadings heading={heading} actions={actions} />
    </div>
  );
};

ImportHeader.propTypes = {
  heading: string,
  actions: arrayOf(
    shape({
      id: string,
      actionProps: shape({}),
      callback: func,
    }),
  ),
};

ImportHeader.defaultProps = {
  heading: '',
  actions: [],
};

export default ImportHeader;
