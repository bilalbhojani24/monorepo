import React, { useEffect } from 'react';
import { twClassNames } from '@browserstack/utils';
import Prism from 'prismjs';
import PropTypes from 'prop-types';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import '../prismLanguages';

import 'prismjs/themes/prism.css';
import '../../../ThirdPartyStyles.scss';

export default function PrismHighlight({
  code,
  language,
  showLineNumber,
  shouldWrapText,
  codeOverrideClassName,
  wrapperClassName
}) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div
      className={twClassNames(
        { 'whitespace-pre-wrap': shouldWrapText },
        wrapperClassName
      )}
    >
      <pre
        className={twClassNames(
          '!bg-base-100 !rounded-md !px-3 !py-2',
          codeOverrideClassName
        )}
      >
        <code
          className={twClassNames(`language-${language} !text-xs !leading-5`, {
            'line-numbers': showLineNumber
          })}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

PrismHighlight.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  showLineNumber: PropTypes.bool,
  shouldWrapText: PropTypes.bool,
  codeOverrideClassName: PropTypes.string,
  wrapperClassName: PropTypes.string
};

PrismHighlight.defaultProps = {
  showLineNumber: false,
  shouldWrapText: false,
  language: 'javascript',
  codeOverrideClassName: '',
  wrapperClassName: ''
};
