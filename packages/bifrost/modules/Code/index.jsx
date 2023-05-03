import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { arrayOf, bool, node, oneOf, shape, string } from 'prop-types';

import CopyButton from './components/CopyButton';
import { colorShades, HIGHLIGHT_TYPE } from './const/codeConstants';
import { convertRangeToArray, isNumber } from './utils';

const Code = ({
  code,
  maxHeight,
  highlight,
  showLineNumbers,
  singleLine,
  toolbar,
  wordWrap
}) => {
  const [showCopy, setShowCopy] = useState(false);
  return (
    <div className="border-base-300 relative flex flex-col rounded-md border">
      {toolbar}
      <SyntaxHighlighter
        language="javascript"
        style={vs}
        customStyle={{
          padding: !showLineNumbers ? '8px' : '8px 0',
          ...(singleLine && { padding: '16px' }),

          maxHeight
        }}
        className="bg-base-50 relative rounded-md"
        {...(!singleLine && { showLineNumbers })}
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
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
        lineNumberContainerStyle={{
          borderRight: '1px solid gray !important',
          marginRight: '5px !important'
        }}
      >
        {code}
      </SyntaxHighlighter>
      {showCopy && <CopyButton code={code} setShowCopy={setShowCopy} />}
    </div>
  );
};

export default Code;

Code.propTypes = {
  code: string,
  maxHeight: string,
  highlight: arrayOf(
    shape({
      range: string,
      type: oneOf(HIGHLIGHT_TYPE)
    })
  ),
  showLineNumbers: bool,
  singleLine: bool,
  toolbar: node,
  wordWrap: bool
};

Code.defaultProps = {
  code: '',
  maxHeight: undefined,
  highlight: null,
  showLineNumbers: false,
  singleLine: false,
  toolbar: null,
  wordWrap: false
};
