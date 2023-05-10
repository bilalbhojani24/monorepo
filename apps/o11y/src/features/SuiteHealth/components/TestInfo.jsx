/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { MdOutlineFolderOpen } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yHyperlink } from 'common/bifrostProxy';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import ScopeLine from 'common/ScopeLine';
import PropTypes from 'prop-types';

export default function TestInfo({ testDetails }) {
  return (
    <>
      <div className="mb-0.5 flex items-center gap-2">
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
        <MdOutlineFolderOpen className="text-base-400 mr-1 h-4 w-4" />
        {testDetails?.vcFileUrl ? (
          <PropagationBlocker
            className={twClassNames('max-w-[150px] truncate pr-1', {
              'border-r border-base-300': testDetails?.scopeList?.length > 0
            })}
            dir="rtl"
          >
            <O11yHyperlink
              href={testDetails?.vcFileUrl}
              target="_blank"
              wrapperClassName="text-sm text-base-500 leading-5 font-normal inline"
            >
              {testDetails?.filePath}
            </O11yHyperlink>
          </PropagationBlocker>
        ) : (
          <span
            className={twClassNames(
              'mr-1 max-w-[150px] truncate pr-1 text-sm',
              {
                'border-r border-base-300': testDetails?.scopeList?.length > 0
              }
            )}
            dir="rtl"
          >
            {testDetails?.filePath}
          </span>
        )}
        {testDetails?.scopeList?.length > 0 && (
          <div className=" max-w-[400px] truncate text-sm">
            <ScopeLine scopes={testDetails?.scopeList} />
          </div>
        )}
      </div>
    </>
  );
}

TestInfo.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};
