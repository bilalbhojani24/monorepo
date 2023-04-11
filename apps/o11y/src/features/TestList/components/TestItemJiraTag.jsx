import React, { useContext, useEffect, useState } from 'react';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import { singleItemTestDetails } from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import PropTypes from 'prop-types';

const generatedIssueName = (url) => url.split('/').pop();

export default function TestItemJiraTag({ details }) {
  const { id, jiraUrl } = details;
  const [createdJiraIssue, setCreatedJiraIssue] = useState({});
  const { o11yTestListingInteraction } = useContext(TestListContext);

  useEffect(() => {
    const unSubscribe = window.pubSub.subscribe(
      'onCreateJiraIssue',
      ({ testRunId, url }) => {
        if (id === testRunId) {
          setCreatedJiraIssue({
            url,
            label: generatedIssueName(url)
          });
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [id]);

  if (jiraUrl || createdJiraIssue?.url) {
    return (
      <PropagationBlocker
        className="flex items-center"
        onClick={() => o11yTestListingInteraction('jira_link_clicked')}
      >
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
