import React, { useEffect, useState } from 'react';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import { singleItemTestDetails } from 'features/BuildDetails/constants';
import PropTypes from 'prop-types';

const generatedIssueName = (url) => url.split('/').pop();

export default function TestItemJiraTag({ details }) {
  const { id, jiraUrl } = details;
  const [createdJiraIssue, setCreatedJiraIssue] = useState({});

  useEffect(() => {
    window.pubSub.subscribe('onCreateJiraIssue', ({ testRunId, url }) => {
      if (id === testRunId) {
        setCreatedJiraIssue({
          url,
          label: generatedIssueName(url)
        });
      }
    });
  }, [id]);

  if (jiraUrl || createdJiraIssue?.url) {
    return (
      <PropagationBlocker className="flex items-center">
        <JiraTag
          jiraUrl={jiraUrl || createdJiraIssue.url}
          wrapperClassName="tl-test__jira-tag"
        />
      </PropagationBlocker>
    );
  }
  return null;
}
TestItemJiraTag.propTypes = {
  details: PropTypes.shape(singleItemTestDetails).isRequired
};
TestItemJiraTag.defaultProps = {};
