import React from 'react';
import {
  BuildKiteIcon,
  GithubIcon,
  GitIcon,
  GitLabIcon,
  JenkinsIcon
} from 'assets/icons/components';

function BuildDetails() {
  return (
    <div>
      BuildDetails
      <JenkinsIcon className="h-6 w-6" />
      <GithubIcon className="h-6 w-6" />
      <GitLabIcon className="h-6 w-6" />
      <BuildKiteIcon className="h-6 w-6" />
      <GitIcon className="h-6 w-6" color="#F05133" />
    </div>
  );
}

export default BuildDetails;
