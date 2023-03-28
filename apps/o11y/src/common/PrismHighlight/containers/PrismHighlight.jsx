import React, { useEffect } from 'react';
import Prism from 'prismjs';
import PropTypes from 'prop-types';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import '../prismLanguages';

import 'prismjs/themes/prism.css';
import '../../../ThirdPartyStyles.scss';

export default function PrismHighlight({ code, language, showLineNumber }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <div>
      <pre className="!bg-base-100 !rounded-md !px-3 !py-2">
        <code
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`language-${language} ${
            showLineNumber ? 'line-numbers' : ''
          } !text-xs !leading-5`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

PrismHighlight.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  showLineNumber: PropTypes.bool
};

PrismHighlight.defaultProps = {
  showLineNumber: false
};
