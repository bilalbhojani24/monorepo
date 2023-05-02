import React, { useEffect } from 'react';
import Prism from 'prismjs';

const Code = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();

    setTimeout(() => {
      const element = document.querySelector('[data-range="5-6"]');
      console.log(element);
      element.style.backgroundColor = 'red';
      element.style.opacity = '0.2';
    }, 100);

    Prism.plugins.NormalizeWhitespace.setDefaults({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
      'break-lines': 80
      // indent: 2,
      // 'remove-initial-line-feed': false,
      // 'tabs-to-spaces': 0,
      // 'spaces-to-tabs': 0
    });
  }, []);

  return (
    <div className="Code line-numbers">
      <h2> Code Syntax Block {language}</h2>
      <button
        data-src="myfile.js"
        data-download-link
        data-download-link-label="Download this file"
      >
        Download
      </button>
      <pre data-line="2, 5-6">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default Code;
