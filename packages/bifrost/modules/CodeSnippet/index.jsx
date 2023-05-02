import React from 'react';
import PropTypes from 'prop-types';
import Code from './Code';

const JSCode = `const App = props => {
  return (
    <div>
      <h1> Prism JS </h1>
      <div>Awesome Syntax Highlighter dkjfv dfivndjfn vneifdsvndsfjvnsdfjkvnsdkfnvksfnvksnfvkjsndvkjnsdjkvnsdkjvnsjkdnvjksdnvksdnvkjsdnvkjsdnvsdnjvjknsdvjksdnjkvjksdnvjksdnvkskjdvnjksdvjknsdjkvsdnjkvknsvjksdvknsdjknv</div>
    </div>
  );
};
`;

const htmlCode = `
    <div>
      <h1> PrismJS Tutorial </h1>
      <p>
      Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
      </p>
    </div>
`;

const CodeSnippet = () => {
  return (
    <div>
      <Code code={JSCode} language="javascript" />
      {/* <Code code={htmlCode} language="html" /> */}
    </div>
  );
};

CodeSnippet.propTypes = {};
CodeSnippet.defaultProps = {};

export default CodeSnippet;
