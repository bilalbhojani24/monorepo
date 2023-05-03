import React from 'react';
import { node } from 'prop-types';

const CodeSnippetToolbar = ({ leadingNode, trailingNode }) => (
  <div className="border-base-300 flex items-center justify-between rounded-t-lg border-b bg-white px-4 py-2">
    <div className="">{leadingNode}</div>
    <div className="">{trailingNode}</div>
  </div>
);

export default CodeSnippetToolbar;

CodeSnippetToolbar.propTypes = {
  leadingNode: node,
  trailingNode: node
};

CodeSnippetToolbar.defaultProps = {
  leadingNode: null,
  trailingNode: null
};
