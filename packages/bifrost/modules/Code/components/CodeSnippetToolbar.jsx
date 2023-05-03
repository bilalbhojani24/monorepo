import React from 'react';
import { node } from 'prop-types';

const CodeSnippetToolbar = ({ leadingNode, trailingNode }) => (
  <div className="border-base-300 flex items-stretch justify-between rounded-t-lg border-b bg-white">
    <div className="bg-base-200 flex-1 p-2">{leadingNode}</div>
    <div className="bg-base-200 flex-1 p-2">{trailingNode}</div>
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
