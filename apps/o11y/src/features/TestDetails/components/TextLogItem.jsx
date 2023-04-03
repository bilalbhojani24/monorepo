/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  MdOutlineArrowDropDown,
  MdOutlineArrowRight
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import ImageViewerWithGallery from 'common/ImageViewerWithGallery';
import PrismHighlight from 'common/PrismHighlight';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { LOG_LEVELS, TEXT_LOG_CHAR_LIMIT } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';
import { formatLog } from '../utils';

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
        <div className="table-cell min-w-[80px] max-w-[320px] shrink-0 break-words pl-4 font-semibold">
          {key}
        </div>
        {key === 'script' ? (
          <PrismHighlight
            showCopy={false}
            content={truncateTextAndAppendMessage(
              parseLogValue(logData?.args[key])
            )}
            showLineNumber
            shouldWrapText
          />
        ) : (
          <div className="table-cell break-words pl-6 pr-4">
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
        <pre className="mb-0 whitespace-pre-wrap break-words px-4">
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
        <pre className="mb-0 whitespace-pre-wrap break-words px-4">
          {response.value.text}
        </pre>
      );
    } else {
      formattedText.forEach((item, index) => {
        output.push(
          <div className="flex whitespace-pre-wrap px-4" key={uuidv4()}>
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
          <div className="table-cell break-words pl-6 pr-4">
            {logData?.args}
          </div>
        </div>
      );
    }
    return '';
  };

  return (
    <button
      className={twClassNames(
        'border-base-200 flex break-words border-b py-4 text-left',
        {
          '': LOG_LEVELS.ERROR === data?.logLevel
          // '': LOG_LEVELS.SEVERE === data?.logLevel
        }
      )}
      type="button"
      onClick={handleClick}
      data-idx={data.idx}
    >
      <div className="flex items-center">
        {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
        <LogItemIcon logLevel={data?.logLevel} />
        {!logData?.response?.value?.isSnapShot &&
          (!isEmpty(logData?.args) || logData?.response?.value) && (
            <>
              {isExpanded ? (
                <MdOutlineArrowDropDown className="text-base-400 h-4 w-4" />
              ) : (
                <MdOutlineArrowRight className="text-base-400 h-4 w-4" />
              )}
            </>
          )}
        <div>
          <span className="inline-flex leading-5">{logData?.readableText}</span>
          <span className="text-base-500 ml-3">
            {logData?.args?.using && logData?.args?.value && (
              <>
                {logData?.args?.using}={logData?.args?.value?.substring(0, 80)}
              </>
            )}
            {logData?.args?.script?.substring(0, 80)}
            {logData?.args?.url?.substring(0, 80)}
          </span>
        </div>
        {!!data?.duration && <LogItemDuration duration={data.duration} />}
        <LogTypeIcon logType={data.logType} />
      </div>
      {logData?.response?.value?.isSnapShot ? (
        <ImageViewerWithGallery images={[logData?.response?.value?.text]} />
      ) : (
        <>
          {isExpanded && (
            <div className="">
              {!isEmpty(logData?.args) && (
                <div className="bg-base-50 border-base-300 mt-3 w-full rounded-t border pl-3 text-xs">
                  <div className="border-base-300 mb-3 border-b py-1 px-4 font-semibold">
                    Params
                  </div>
                  <div className="table table-fixed">{renderArgs()}</div>
                </div>
              )}
              {logData?.response?.value && (
                <div className="bg-base-50 border-base-300 mt-3 w-full rounded-t border pl-3 text-xs">
                  <div className="border-base-300 mb-3 border-b py-1 px-4 font-semibold">
                    Response
                  </div>
                  {renderResponse(logData.response)}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </button>
  );
}
TextLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
