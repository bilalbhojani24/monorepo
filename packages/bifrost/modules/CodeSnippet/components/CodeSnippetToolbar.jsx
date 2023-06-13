import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { node } from 'prop-types';

import { CodeSnippetContextData } from '../../../shared/codeSnippetContext';
import { CODE_VIEW } from '../const/codeConstants';

const CodeSnippetToolbar = ({ leadingNode, trailingNode }) => {
  const { view } = useContext(CodeSnippetContextData);

  return (
    <div
      className={twClassNames(
        'border-base-300 flex items-center justify-between rounded-t-md border-b bg-white',
        {
          'bg-danger-50 border-danger-300': view === CODE_VIEW[1],
          'bg-attention-50 border-attention-400': view === CODE_VIEW[2]
        }
      )}
    >
      <div
        className={twClassNames('p-2', {
          'text-danger-700': view === CODE_VIEW[1],
          'text-attention-700': view === CODE_VIEW[2]
        })}
      >
        {leadingNode}
      </div>
      <div className="p-2 text-right">{trailingNode}</div>
    </div>
  );
};

export default CodeSnippetToolbar;

CodeSnippetToolbar.propTypes = {
  leadingNode: node,
  trailingNode: node
};

CodeSnippetToolbar.defaultProps = {
  leadingNode: null,
  trailingNode: null
};
