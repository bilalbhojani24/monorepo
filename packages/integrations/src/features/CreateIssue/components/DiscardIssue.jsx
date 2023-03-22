import React from 'react';
import { Button, MdSave } from '@browserstack/bifrost';

const DiscardIssue = ({ continueEditing, confirmIssueDiscard }) => (
  <div className="flex h-full flex-col items-center">
    <p className="bg-brand-100 w-fit rounded-full p-6">
      <MdSave className="text-brand-500 text-3xl" />
    </p>
    <p className="pt-8 text-lg">Your changes won’t be saved</p>
    <p className="text-base-500 mt-2 text-center text-sm">
      We won’t be able to save or update your Jira issue if you leave the page.
    </p>

    <Button
      wrapperClassName="text-base-700"
      colors="white"
      fullWidth
      onClick={continueEditing}
    >
      Continue editing
    </Button>
    <Button fullWidth onClick={confirmIssueDiscard}>
      Discard issue
    </Button>
  </div>
);
export default DiscardIssue;
