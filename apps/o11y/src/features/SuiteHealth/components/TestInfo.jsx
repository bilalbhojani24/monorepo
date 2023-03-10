/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import ScopeLine from 'common/ScopeLine';
import PropTypes from 'prop-types';
// import PropagationBlocker from 'testops/components/PropagationBlocker';
// import JiraTag from 'testops/components/JiraTag/containers/JiraTag';

export default function TestInfo({ testDetails }) {
  return (
    <div className="">
      <div className="">
        <span className="text-base-900 break-words">{testDetails?.title}</span>
        {/* {testDetails?.jiraUrl && (
          <PropagationBlocker className="d-inline">
            <JiraTag jiraUrl={testDetails.jiraUrl} wrapperClassName="to-snp-tests__jira-tag" />
          </PropagationBlocker>
        )} */}
      </div>
      <div
        className="text-base-500 flex items-center"
        title={testDetails?.filePath}
      >
        {testDetails?.vcFileUrl ? (
          <a
            href={testDetails?.vcFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ direction: 'rtl' }}
          >
            {testDetails?.filePath}
          </a>
        ) : (
          <span
            className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ direction: 'rtl' }}
          >
            {testDetails?.filePath}
          </span>
        )}
        {testDetails?.scopeList?.length > 0 && (
          <span className="border-base-300 ml-1 max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap border-l pl-1">
            <ScopeLine scopes={testDetails?.scopeList} />
          </span>
        )}
      </div>
    </div>
  );
}

TestInfo.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};
