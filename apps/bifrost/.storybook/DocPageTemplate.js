import React from 'react';
import PropTypes from 'prop-types';
import { Source } from '@storybook/addon-docs/blocks';
import { Primary, ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

const DocPageTemplate = ({ importStatement }) => {
  return (
    <>
      {importStatement && <Source language="js" dark code={importStatement} />}
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
    </>
  );
};

DocPageTemplate.propTypes = {
  importStatement: PropTypes.string
};

DocPageTemplate.defaultProps = {
  importStatement: ''
};

export default DocPageTemplate;
