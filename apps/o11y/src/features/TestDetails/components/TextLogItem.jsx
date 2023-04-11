/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowRight,
  MdOutlineCode
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { DefaultBrowserIcon, FindElementIcon } from 'assets/icons/components';
import { O11yTruncateText } from 'common/bifrostProxy';
import PrismHighlight from 'common/PrismHighlight';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { LOG_LEVELS, TEXT_LOG_CHAR_LIMIT } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';
import { formatLog } from '../utils';

import ImageGallery from './ImageGallery';
import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

const parseLogValue = (value) =>
  typeof value === 'object' ? JSON.stringify(value) : value;
const truncateTextAndAppendMessage = (text) => {
  if (!text) {
    return text;
  }
  const textLength = text.length;
  let formattedText = text;
  if (textLength > TEXT_LOG_CHAR_LIMIT) {
    // const { url } = this.props;
    formattedText = text.substr(0, TEXT_LOG_CHAR_LIMIT);
    formattedText += `\nTRUNCATED as the text is too long to show. Use Raw logs to view complete details`;
  }
  return formattedText;
};

const isError = (logLevel) => {
  if (!logLevel) return false;
  return [LOG_LEVELS.ERROR, LOG_LEVELS.FATAL, LOG_LEVELS.SEVERE].includes(
    logLevel
  );
};

const isWarning = (logLevel) => {
  if (!logLevel) return false;
  return [LOG_LEVELS.WARN, LOG_LEVELS.WARNING].includes(logLevel);
};

export default function TextLogItem({ data, searchText }) {
  const [logData, setLogData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data)) {
      setLogData(formatLog(data?.content));
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(logData)) {
      if (searchText) {
        try {
          const match =
            logData?.readableText?.toLowerCase()?.includes(searchText) ||
            logData?.args?.using?.toLowerCase()?.includes(searchText) ||
            logData?.args?.value
              ?.substring(0, 256)
              ?.toLowerCase()
              ?.includes(searchText) ||
            logData?.args?.script
              ?.substring(0, 256)
              ?.toLowerCase()
              ?.includes(searchText) ||
            logData?.args?.url?.toLowerCase()?.includes(searchText) ||
            logData?.response?.value?.text
              ?.toLowerCase()
              ?.includes(searchText) ||
            logData?.response?.value?.stringifiedText
              ?.toLowerCase()
              ?.includes(searchText);
          setIsMatching(match);
        } catch {
          setIsMatching(false);
        }
      } else {
        setIsMatching(true);
      }
    }
  }, [searchText, logData]);

  if (!isMatching) {
    return null;
  }

  if (
    (isEmpty(data) && isEmpty(logData)) ||
    !activeLogLevels.includes(data?.logLevel)
  ) {
    return null;
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (data?.startOffset) {
      handleLogDurationClick(data?.startOffset / 1000);
    }
  };

  const renderRequest = (key) => {
    if (isEmpty(logData?.args?.[key])) {
      return null;
    }
    return (
      <div className="table-row">
        <div
          className={twClassNames(
            'text-base-600 table-cell min-w-[80px] max-w-[320px] shrink-0 break-words pl-4 font-mono text-xs font-medium',
            {
              'text-danger-600': isError(data?.logLevel),
              'text-attention-600': isWarning(data?.logLevel)
            }
          )}
        >
          {key}
        </div>
        {key === 'script' ? (
          <PrismHighlight
            showCopy={false}
            code={truncateTextAndAppendMessage(
              parseLogValue(logData?.args[key])
            )}
            showLineNumber
            shouldWrapText
            codeOverrideClassName="!bg-transparent [&>code]:!whitespace-pre-wrap !pt-0"
            wrapperClassName="pr-4"
          />
        ) : (
          <div
            className={twClassNames(
              'text-base-600 table-cell break-words pl-6 pr-4 font-mono text-xs font-normal',
              {
                'text-danger-600': isError(data?.logLevel),
                'text-attention-600': isWarning(data?.logLevel)
              }
            )}
          >
            {parseLogValue(logData?.args[key])}
          </div>
        )}
      </div>
    );
  };
  const renderResponse = (response) => {
    if (isEmpty(response?.value)) {
      return null;
    }
    if (response.value?.isObject) {
      return (
        <pre
          className={twClassNames(
            'text-base-600 mb-0 whitespace-pre-wrap break-words px-4 font-mono',
            {
              'text-danger-600': isError(data?.logLevel),
              'text-attention-600': isWarning(data?.logLevel)
            }
          )}
        >
          {response.value?.stringifiedText}
        </pre>
      );
    }
    const truncatedText = truncateTextAndAppendMessage(response.value.text);
    const formattedText = isExpanded
      ? truncatedText.split('\n')
      : truncatedText.split('\n').splice(0, 100);
    let output = [];
    if (formattedText.length === 1) {
      output = (
        <pre
          className={twClassNames(
            'text-base-600 mb-0 whitespace-pre-wrap break-words px-4 font-mono',
            {
              'text-danger-600': isError(data?.logLevel),
              'text-attention-600': isWarning(data?.logLevel)
            }
          )}
        >
          {response.value.text}
        </pre>
      );
    } else {
      formattedText.forEach((item, index) => {
        output.push(
          <div
            className={twClassNames(
              'text-base-600 flex whitespace-pre-wrap px-4 font-mono',
              {
                'text-danger-600': isError(data?.logLevel),
                'text-attention-600': isWarning(data?.logLevel)
              }
            )}
            key={uuidv4()}
          >
            <div className="min-w-[32px] pl-2">{index + 1}</div>
            <div className="">{item}</div>
          </div>
        );
      });
    }
    return output;
  };

  const renderArgs = () => {
    if (typeof logData?.args === 'object') {
      return Object.keys(logData?.args).map((key) => (
        <React.Fragment key={key}>{renderRequest(key)}</React.Fragment>
      ));
    }
    if (typeof logData?.args === 'string') {
      return (
        <div className="table-row">
          <div
            className={twClassNames(
              'table-cell break-words pl-6 pr-4 text-base-600 text-sm font-normal',
              {
                'text-danger-600': isError(data?.logLevel),
                'text-attention-600': isWarning(data?.logLevel)
              }
            )}
          >
            {logData?.args}
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <div
      className={twClassNames(
        'border-base-200 flex px-2 flex-col break-words border-b py-3 text-left',
        {
          'bg-danger-50':
            LOG_LEVELS.ERROR === data?.logLevel ||
            LOG_LEVELS.SEVERE === data?.logLevel,
          'bg-attention-50':
            LOG_LEVELS.WARNING === data?.logLevel ||
            LOG_LEVELS.WARN === data?.logLevel
        }
      )}
      role="button"
      onClick={handleClick}
      onKeyDown={() => {}}
      tabIndex={0}
      data-idx={data.idx}
    >
      <div
        className={twClassNames('flex w-full items-start justify-between', {
          'pl-6':
            logData?.response?.value?.isSnapShot ||
            (isEmpty(logData?.args) && !logData?.response?.value)
        })}
      >
        <div className="flex items-start">
          {!logData?.response?.value?.isSnapShot &&
            (!isEmpty(logData?.args) || logData?.response?.value) && (
              <span className="mr-2">
                {isExpanded ? (
                  <MdOutlineArrowDropDown className="text-base-400 h-4 w-4" />
                ) : (
                  <MdOutlineArrowRight className="text-base-400 h-4 w-4" />
                )}
              </span>
            )}

          {data?.startOffset && (
            <LogItemStartTime duration={data?.startOffset} />
          )}
          <LogItemIcon logLevel={data?.logLevel} />
          <div className="flex flex-col gap-2">
            <span
              className={twClassNames(
                'inline-flex text-sm font-normal leading-5 text-base-900',
                {
                  'text-danger-600 font-medium': isError(data?.logLevel),
                  'text-attention-600 font-medium': isWarning(data?.logLevel)
                }
              )}
            >
              {logData?.readableText}
            </span>
            {!isEmpty(logData?.args) && (
              <div className="text-base-500 flex items-center gap-2 text-sm font-normal leading-5">
                {logData?.args?.using && logData?.args?.value && (
                  <span className="inline-flex items-center gap-1">
                    <FindElementIcon className="text-base-500 h-4 w-4" />
                    {logData?.args?.using}=
                    {logData?.args?.value?.substring(0, 80)}
                  </span>
                )}
                {logData?.args?.script && (
                  <div className="inline-flex items-center gap-1">
                    <span>
                      <MdOutlineCode className="text-base-500 h-4 w-4" />
                    </span>
                    <O11yTruncateText
                      wrapperClassName="line-clamp-1"
                      tooltipContent={
                        <p className="text-base-500 break-words px-4 text-sm font-normal leading-5 text-white">
                          {logData.args.script}
                        </p>
                      }
                      hidetooltipTriggerIcon
                    >
                      {logData.args.script.substring(0, 80)}
                    </O11yTruncateText>
                  </div>
                )}
                {logData?.args?.url && (
                  <span className="inline-flex items-center gap-1">
                    <DefaultBrowserIcon className="text-base-500 h-4 w-4" />
                    <O11yTruncateText
                      wrapperClassName="line-clamp-1"
                      tooltipContent={
                        <p className="text-base-500 break-words px-4 text-sm font-normal leading-5 text-white">
                          {logData.args.url}
                        </p>
                      }
                      hidetooltipTriggerIcon
                    >
                      {logData.args.url.substring(0, 80)}
                    </O11yTruncateText>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {!!data?.duration && <LogItemDuration duration={data.duration} />}
          <LogTypeIcon logType={data.logType} />
        </div>
      </div>
      {logData?.response?.value?.isSnapShot ? (
        <div className="pl-20">
          <ImageGallery images={[logData?.response?.value?.text]} />
        </div>
      ) : (
        <>
          {isExpanded && (
            <div className="w-full">
              {!isEmpty(logData?.args) && (
                <div
                  className={twClassNames(
                    'border-base-300 mt-3 w-full overflow-hidden rounded-xl border pb-3 text-xs bg-white',
                    {
                      'border-danger-200 bg-danger-50': isError(data?.logLevel),
                      'border-attention-200 bg-attention-50': isWarning(
                        data?.logLevel
                      )
                    }
                  )}
                >
                  <div
                    className={twClassNames(
                      'border-base-300 text-base-600 bg-base-100 mb-3 border-b py-2 px-4 font-mono text-xs font-semibold',
                      {
                        'bg-danger-100 border-danger-200 text-danger-600':
                          isError(data?.logLevel),
                        'bg-attention-100 border-attention-200 text-attention-600':
                          isWarning(data?.logLevel)
                      }
                    )}
                  >
                    Params
                  </div>
                  <div className="table table-fixed">{renderArgs()}</div>
                </div>
              )}
              {logData?.response?.value && (
                <div
                  className={twClassNames(
                    'border-base-300 mt-3 w-full overflow-hidden rounded-xl border pb-3 text-xs bg-white',
                    {
                      'border-danger-200 bg-danger-50': isError(data?.logLevel),
                      'border-attention-200 bg-attention-50': isWarning(
                        data?.logLevel
                      )
                    }
                  )}
                >
                  <div
                    className={twClassNames(
                      'border-base-300 text-base-600 bg-base-100 mb-3 border-b py-2 px-4 font-mono text-xs font-semibold',
                      {
                        'bg-danger-100 border-danger-200 text-danger-600':
                          isError(data?.logLevel),
                        'bg-attention-100 border-attention-200 text-attention-600':
                          isWarning(data?.logLevel)
                      }
                    )}
                  >
                    Response
                  </div>
                  {renderResponse(logData.response)}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
TextLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
