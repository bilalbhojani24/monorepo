import React from 'react';
import { node } from 'prop-types';

const CodeSnippetToolbar = ({ leadingNode, trailingNode }) => (
  <div className="border-base-300 flex items-center justify-between rounded-t-lg border-b bg-white">
    <div className="p-2">{leadingNode}</div>
    <div className="p-2 text-right">{trailingNode}</div>
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
