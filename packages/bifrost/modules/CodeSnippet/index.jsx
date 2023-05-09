import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { twClassNames } from '@browserstack/utils';
import { arrayOf, bool, node, oneOf, shape, string } from 'prop-types';

import { CodeSnippetContextData } from '../../shared/codeSnippetContext';

import CopyButton from './components/CopyButton';
import {
  CODE_VIEW,
  colorShades,
  HIGHLIGHT_TYPE,
  viewShades
} from './const/codeConstants';
import { borderConst, convertRangeToArray, isNumber } from './utils';

const CodeSnippet = ({
  code,
  language,
  maxHeight,
  highlight,
  showLineNumbers,
  singleLine,
  toolbar,
  view
  // wordWrap
}) => {
  const [showCopy, setShowCopy] = useState(false);

  const getTheme = () => {
    if (singleLine) return '';
    if (view === CODE_VIEW[0]) return a11yLight;
    return '';
  };
  return (
    <CodeSnippetContextData.Provider
      value={{
        view,
        code,
        setShowCopy,
        showCopy
      }}
    >
      <div
        className={twClassNames(
          'border-base-300 relative flex flex-col rounded-md border',
          {
            'border-danger-700 bg-white': view === CODE_VIEW[1],
            'border-attention-400 bg-white': view === CODE_VIEW[2]
          }
        )}
      >
        {toolbar}
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={getTheme()}
            customStyle={{
              maxHeight
            }}
            className={twClassNames(
              'text-sm !p-0 overflow-y-scroll relative rounded-b-md !bg-white',
              {
                'rounded-md': !toolbar,
                '!p-4': !showLineNumbers || singleLine,
                'text-danger-700': view === CODE_VIEW[1],
                'text-attention-700': view === CODE_VIEW[2]
              }
            )}
            {...(!singleLine && { showLineNumbers })}
            // wrapLines={!wordWrap}
            wrapLongLines
            lineNumberStyle={(n) => {
              const commonStyles = {
                minWidth: '36px',
                width: '36px',
                textAlign: 'center',
                padding: 0,
                marginRight: '16px',
                borderRight: `1px solid #D1D5DB`,
                ...((view === CODE_VIEW[1] || view === CODE_VIEW[2]) && {
                  borderRight: `1px solid ${viewShades[view].backgroundBorderColor}`,
                  background: '#ffffff'
                }),
                fontSize: '14px'
              };
              if (view === CODE_VIEW[0] && showLineNumbers) {
                const lineNumberStyles = {
                  [HIGHLIGHT_TYPE[0]]: {
                    background: colorShades.neutral.lightColor,
                    color: colorShades.neutral.textColor,
                    ...commonStyles,
                    borderRight: `1px solid ${colorShades.neutral.darkColor}`
                  },
                  [HIGHLIGHT_TYPE[1]]: {
                    background: colorShades.danger.lightColor,
                    color: colorShades.danger.textColor,
                    ...commonStyles,
                    borderRight: `1px solid ${colorShades.danger.darkColor}`
                  },
                  [HIGHLIGHT_TYPE[2]]: {
                    background: colorShades.attention.lightColor,
                    color: colorShades.attention.textColor,
                    ...commonStyles,
                    borderRight: `1px solid ${colorShades.attention.darkColor}`
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

                return {
                  ...commonStyles
                };
              }
              return { ...commonStyles };
            }}
            lineProps={(n) => {
              const style = {};
              if (view === CODE_VIEW[0] && showLineNumbers) {
                highlight.forEach(({ range, type }) => {
                  const lineNumber = Number(range);
                  const lineNumbersRange = convertRangeToArray(range);
                  if (isNumber(range)) {
                    if (lineNumber === n) {
                      style.borderTop = borderConst(type);
                      style.borderBottom = borderConst(type);
                    }
                  } else if (lineNumbersRange[0] === n) {
                    style.borderTop = borderConst(type);
                  } else if (
                    lineNumbersRange[lineNumbersRange.length - 1] === n
                  ) {
                    style.borderBottom = borderConst(type);
                  }
                });
              }
              return { style };
            }}
            onMouseEnter={() => setShowCopy(true)}
            onMouseLeave={() => setShowCopy(false)}
          >
            {code}
          </SyntaxHighlighter>
          <CopyButton />
        </div>
      </div>
    </CodeSnippetContextData.Provider>
  );
};

export default CodeSnippet;

CodeSnippet.propTypes = {
  code: string,
  maxHeight: string,
  language: string,
  highlight: arrayOf(
    shape({
      range: string,
      type: oneOf(HIGHLIGHT_TYPE)
    })
  ),
  showLineNumbers: bool,
  singleLine: bool,
  toolbar: node,
  view: oneOf(CODE_VIEW)
  // wordWrap: bool
};

CodeSnippet.defaultProps = {
  code: '',
  language: 'javascript',
  maxHeight: undefined,
  highlight: [],
  showLineNumbers: false,
  singleLine: false,
  toolbar: null,
  view: CODE_VIEW[0]
  // wordWrap: false
};
