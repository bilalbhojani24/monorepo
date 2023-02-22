import React from 'react';
import PropTypes from 'prop-types';

import BasicWidget from '../BasicWidget';

import Content from './components/Content';
import { CreateIssueOptionsType } from './types';

const WIDGET_POSITIONS = ['left', 'right'];

const CreateIssue = ({
  isOpen,
  authUrl,
  options,
  position,
  projectId,
  positionRef,
  handleClose
}) => (
  <BasicWidget
    isOpen={isOpen}
    authUrl={authUrl}
    options={options}
    position={position}
    projectId={projectId}
    positionRef={positionRef}
    handleClose={handleClose}
  >
    <Content
      projectId={projectId}
      options={options}
      componentKey="create_issue"
    />
  </BasicWidget>
);

CreateIssue.propTypes = {
  isOpen: PropTypes.bool,
  authUrl: PropTypes.string.isRequired,
  options: CreateIssueOptionsType,
  position: PropTypes.oneOf(WIDGET_POSITIONS),
  projectId: PropTypes.string,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  handleClose: PropTypes.func.isRequired
};
CreateIssue.defaultProps = {
  isOpen: false,
  options: null,
  position: WIDGET_POSITIONS[0],
  projectId: null,
  positionRef: null
};
export default CreateIssue;
