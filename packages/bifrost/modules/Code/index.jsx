import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { arrayOf, bool, node, oneOf, shape, string } from 'prop-types';

import { colorShades, HIGHLIGHT_TYPE } from './const/codeConstants';
import { convertRangeToArray, isNumber } from './utils';

const Code = ({ code, highlight, showLineNumbers, toolbar, wordWrap }) => (
  <div className="border-base-300 flex flex-col rounded-md border">
    {toolbar}
    <SyntaxHighlighter
      language="javascript"
      style={docco}
      customStyle={{ padding: '8px 0' }}
      className="bg-base-50 rounded-md"
      showLineNumbers={showLineNumbers}
      wrapLines={!wordWrap}
      wrapLongLines={wordWrap}
      lineNumberStyle={(n) => {
        const lineNumberStyles = {
          [HIGHLIGHT_TYPE[0]]: {
            background: colorShades.neutral.darkColor,
            color: colorShades.neutral.textColor
          },
          [HIGHLIGHT_TYPE[1]]: {
            background: colorShades.danger.darkColor,
            color: colorShades.danger.textColor
          },
          [HIGHLIGHT_TYPE[2]]: {
            background: colorShades.attention.darkColor,
            color: colorShades.attention.textColor
          }
        };

        const lineNumbersByType = highlight.reduce(
          (lineNumbers, { range, type }) => {
            const lineNumber = Number(range);

            if (isNumber(range)) {
              lineNumbers[type].push(lineNumber);
            } else if (range.includes('-')) {
              lineNumbers[type].push(...convertRangeToArray(range));
            }

            return lineNumbers;
          },
          {
            [HIGHLIGHT_TYPE[0]]: [],
            [HIGHLIGHT_TYPE[1]]: [],
            [HIGHLIGHT_TYPE[2]]: []
          }
        );

        const result = Object.entries(lineNumbersByType).find((data) =>
          data[1].includes(n)
        );

        if (result) {
          const [type] = result;
          return lineNumberStyles[type];
        }

        return {};
      }}
      lineProps={(n) => {
        console.log(n);
        const style = {};

        highlight.forEach(({ range, type }) => {
          if (isNumber(range) && Number(range) === n) {
            style.background = colorShades[type].lightColor;
          } else {
            const lineNumbersRange = convertRangeToArray(range);
            if (lineNumbersRange.includes(n)) {
              style.background = colorShades[type].lightColor;
            }
          }
        });
        return { style };
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);

export default Code;

Code.propTypes = {
  code: string,
  highlight: arrayOf(
    shape({
      range: string,
      type: oneOf(HIGHLIGHT_TYPE)
    })
  ),
  showLineNumbers: bool,
  toolbar: node,
  wordWrap: bool
};

Code.defaultProps = {
  code: '',
  highlight: null,
  showLineNumbers: false,
  toolbar: null,
  wordWrap: false
};
