import React from 'react';
import { CodeSnippet } from '@browserstack/bifrost';
import { GRID_MANAGER_NAMES } from 'constants/index';
import PropTypes from 'prop-types';

const CodeSnippetForExistingSetup = ({
  activeGridManagerCodeSnippet,
  codeSnippetsForExistingSetup,
  copyCallbackFnForExistingSetup,
  TabsForCodeSnippet
}) => (
  <div className="mt-4">
    <CodeSnippet
      code={
        codeSnippetsForExistingSetup?.[
          activeGridManagerCodeSnippet.name.toLowerCase()
        ]
      }
      copyCallback={() =>
        copyCallbackFnForExistingSetup(activeGridManagerCodeSnippet.name)
      }
      language={
        activeGridManagerCodeSnippet.name.toLowerCase() ===
        GRID_MANAGER_NAMES.cli
          ? 'node'
          : activeGridManagerCodeSnippet.name.toLowerCase()
      }
      singleLine={false}
      showLineNumbers={false}
      view="neutral"
      toolbar={TabsForCodeSnippet}
    />
  </div>
);

CodeSnippetForExistingSetup.propTypes = {
  activeGridManagerCodeSnippet: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  codeSnippetsForExistingSetup: PropTypes.shape({
    helm: PropTypes.string.isRequired,
    kubectl: PropTypes.string.isRequired,
    cli: PropTypes.string.isRequired
  }).isRequired,
  copyCallbackFnForExistingSetup: PropTypes.func.isRequired,
  TabsForCodeSnippet: PropTypes.node.isRequired
};

export default CodeSnippetForExistingSetup;
