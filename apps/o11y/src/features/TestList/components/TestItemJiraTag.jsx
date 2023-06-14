import React, { useContext, useEffect, useState } from 'react';
import { JiraTagList } from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import { singleItemTestDetails } from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

export default function TestItemJiraTag({ details }) {
  const { id, jiraUrl } = details;
  const [jiraUrlList, setJiraUrlList] = useState([]);
  const { o11yTestListingInteraction } = useContext(TestListContext);

  useEffect(() => {
    if (!isEmpty(jiraUrl)) {
      setJiraUrlList(jiraUrl);
    }
  }, [jiraUrl]);

  useEffect(() => {
    const unSubscribe = window.pubSub.subscribe(
      'onCreateJiraIssue',
      ({ testRunId, url, status }) => {
        if (id === testRunId) {
          setJiraUrlList((prev) => [
            ...prev,
            {
              url,
              status
            }
          ]);
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [id]);

  if (isEmpty(jiraUrlList)) {
    return null;
  }

  return (
    <PropagationBlocker className="mb-2 flex items-center ">
      <JiraTagList
        list={jiraUrlList}
        tagClickCb={() => o11yTestListingInteraction('jira_link_clicked')}
      />
    </PropagationBlocker>
  );
}

TestItemJiraTag.propTypes = {
  details: PropTypes.shape(singleItemTestDetails).isRequired
};
TestItemJiraTag.defaultProps = {};
