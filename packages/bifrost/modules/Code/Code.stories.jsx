import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { MdOutlineInsertDriveFile } from '../Icon';

import CodeSnippetToolbar from './components/CodeSnippetToolbar';
import { HIGHLIGHT_TYPE } from './const/codeConstants';
import Code from './index';

const JSCode = `function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key:key
    }));
  }
}`;

const defaultConfig = {
  title: 'Application/Components/Code',
  component: Code,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate importStatement={"import Code from 'bifrost/Code'"} />
      )
    }
  },
  argTypes: {
    code: {
      option: { type: 'string' },
      dscription: 'The code string',
      defaultValue: JSCode
    },
    maxHeight: {
      option: { type: 'string' },
      dscription: 'The max height of the code component'
    },
    highlight: {
      option: { type: null },
      description: 'The lines to be highlighted',
      defaultValue: [
        { range: '3', type: HIGHLIGHT_TYPE[1] },
        { range: '11', type: HIGHLIGHT_TYPE[1] },
        { range: '5-7', type: HIGHLIGHT_TYPE[2] },
        { range: '13-14', type: HIGHLIGHT_TYPE[0] }
      ]
    },
    toolbar: {
      option: { type: null },
      description: 'The toolbar of the code snippet',
      defaultValue: (
        <CodeSnippetToolbar
          leadingNode={
            <div className="flex items-center space-x-2">
              <div>
                <MdOutlineInsertDriveFile className="text-base-500 h-5 w-5" />
              </div>
              <div>index.tsx</div>
            </div>
          }
        />
      )
    },
    showLineNumbers: {
      option: { type: 'boolean' },
      description: 'Show line number or not',
      defaultValue: true
    },
    singleLine: {
      option: { type: 'boolean' },
      description: 'Single line',
      defaultValue: false
    },
    wordWrap: {
      option: { type: 'boolean' },
      description: 'wrap the line or not',
      defaultValue: true
    }
  },
  controls: {}
};
const Template = (args) => <Code {...args} />;
const SingleLineTemplate = (args) => <Code {...args} />;

const Primary = Template.bind({});
const SingleLine = SingleLineTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, SingleLine };

SingleLine.args = {
  code: 'npm install @browserstack/design-system-components',
  singleLine: true
};
