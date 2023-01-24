import React from 'react';
import { TMBadge } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFolderExplorer from './useFolderExplorer';

const FolderExplorer = () => {
  const {} = useFolderExplorer();

  return <div />;
};

FolderExplorer.propTypes = {};

FolderExplorer.defaultProps = {};

export default FolderExplorer;
