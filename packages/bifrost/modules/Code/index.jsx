import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
import { convertRangeToArray, isNumber } from './utils';

const CodeSnippet = ({
  code,
  language,
  maxHeight,
  highlight,
  showLineNumbers,
  singleLine,
  toolbar,
  view,
  wordWrap
}) => {
  const [showCopy, setShowCopy] = useState(false);

  const getTheme = () => {
    if (singleLine) return '';
    if (view === CODE_VIEW[0]) return vs;
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
              'text-sm !p-0 overflow-y-scroll relative rounded-b-md bg-white',
              {
                'rounded-md': !toolbar,
                '!p-4': !showLineNumbers || singleLine,
                'bg-base-50': view === CODE_VIEW[0],
                'text-danger-700': view === CODE_VIEW[1],
                'text-attention-700': view === CODE_VIEW[2]
              }
            )}
            {...(!singleLine && { showLineNumbers })}
            wrapLines={!wordWrap}
            wrapLongLines={wordWrap}
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
                    background: colorShades.neutral.darkColor,
                    color: colorShades.neutral.textColor,
                    ...commonStyles
                  },
                  [HIGHLIGHT_TYPE[1]]: {
                    background: colorShades.danger.darkColor,
                    color: colorShades.danger.textColor,
                    ...commonStyles
                  },
                  [HIGHLIGHT_TYPE[2]]: {
                    background: colorShades.attention.darkColor,
                    color: colorShades.attention.textColor,
                    ...commonStyles
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
              if (view === CODE_VIEW[0] && showLineNumbers) {
                const style = {
                  ...((view === CODE_VIEW[1] || view === CODE_VIEW[2]) && {})
                };

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
              }
              return {};
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
  view: oneOf(CODE_VIEW),
  wordWrap: bool
};

CodeSnippet.defaultProps = {
  code: '',
  language: 'javascript',
  maxHeight: undefined,
  highlight: [],
  showLineNumbers: false,
  singleLine: false,
  toolbar: null,
  view: CODE_VIEW[0],
  wordWrap: false
};
