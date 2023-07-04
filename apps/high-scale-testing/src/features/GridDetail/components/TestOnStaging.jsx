import React from 'react';
import { CodeSnippet } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TestOnStaging = ({ containerClassName }) => (
  <div className="px-6 pb-6">
    <div className={containerClassName}>
      <p className="text-base-900 text-lg font-medium leading-6">
        Steps to test staging websites
      </p>
      <div className="bg-white px-4 pt-4">
        {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
        <ol className="text-base-500 list-[lower-alpha] text-sm">
          <li className="text-base-900 pb-2">
            <div>
              <p className="text-base-900 mb-2">Download CLI</p>
              <CodeSnippet
                code="npm install @browserstack/browserstack-cli"
                language="npm"
                showLineNumbers={false}
                singleLine={false}
                view="neutral"
              />
            </div>
          </li>
          <li>
            <div>
              <p className="text-base-900 mb-2">
                Create private connection between grid and your existing staging
                or local development environments
              </p>
              <CodeSnippet
                code={`/* Create HST configuration profile with AWS credentials */
browserstack-cli ats connect grid ---bstack-username <userName> 
--bstack-accesskey <accessKey> --use-staging true`}
                language="npm"
                showLineNumbers={false}
                singleLine={false}
                view="neutral"
              />
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
);

TestOnStaging.propTypes = {
  containerClassName: PropTypes.string.isRequired
};

export default TestOnStaging;
