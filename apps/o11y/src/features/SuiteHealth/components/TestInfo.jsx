/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import ScopeLine from 'common/ScopeLine';
import PropTypes from 'prop-types';

export default function TestInfo({ testDetails }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-base-900 break-words text-sm">
          {testDetails?.title}
        </span>
        {testDetails?.jiraUrl && (
          <PropagationBlocker className="inline">
            <JiraTag jiraUrl={testDetails.jiraUrl} wrapperClassName="text-sm" />
          </PropagationBlocker>
        )}
      </div>
      <div
        className="text-base-500 flex items-center"
        title={testDetails?.filePath}
      >
        {testDetails?.vcFileUrl ? (
          <PropagationBlocker
            className="border-base-300 max-w-[150px] truncate border-r pr-1"
            dir="rtl"
          >
            <a
              href={testDetails?.vcFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              {testDetails?.filePath}
            </a>
          </PropagationBlocker>
        ) : (
          <span
            className="border-base-300 mr-1 max-w-[150px] truncate border-r pr-1 text-sm"
            dir="rtl"
          >
            {testDetails?.filePath}
          </span>
        )}
        {testDetails?.scopeList?.length > 0 && (
          <span className=" max-w-[400px] truncate text-sm">
            <ScopeLine scopes={testDetails?.scopeList} />
          </span>
        )}
      </div>
    </>
  );
}

TestInfo.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};
