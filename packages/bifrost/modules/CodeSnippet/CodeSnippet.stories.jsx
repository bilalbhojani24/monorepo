import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { MdOutlineFileDownload, MdOutlineInsertDriveFile } from '../Icon';

import CodeSnippetToolbar from './components/CodeSnippetToolbar';
import { CODE_VIEW, HIGHLIGHT_TYPE } from './const/codeConstants';
import CodeSnippet from './index';

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
  title: 'Application/Components/CodeSnippet',
  component: CodeSnippet,
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
      dscription: 'The max height of the code component snippet container'
    },
    highlight: {
      option: { type: null },
      description: 'The lines range to be highlighted',
      defaultValue: [
        { range: '3', type: HIGHLIGHT_TYPE[1] },
        { range: '5-7', type: HIGHLIGHT_TYPE[1] },
        { range: '11', type: HIGHLIGHT_TYPE[2] },
        { range: '13-14', type: HIGHLIGHT_TYPE[2] },
        { range: '17', type: HIGHLIGHT_TYPE[0] },
        { range: '20-23', type: HIGHLIGHT_TYPE[0] }
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
      description: 'Prop to enable the line number or not',
      defaultValue: true
    },
    singleLine: {
      option: { type: 'boolean' },
      description: 'The code snippet is singleLine or multiline',
      defaultValue: false
    },
    view: {
      options: CODE_VIEW,
      description: 'The code view (default, error, warning)',
      defaultValue: CODE_VIEW[0]
    }
    // wordWrap: {
    //   option: { type: 'boolean' },
    //   description: 'wrap the line or not',
    //   defaultValue: true
    // }
  },
  controls: {}
};
const Template = (args) => <CodeSnippet {...args} />;
const SingleLineTemplate = (args) => <CodeSnippet {...args} />;
const LeadingAndTrailingToolbarTemplate = (args) => <CodeSnippet {...args} />;

const fileName = 'index.tsx';
const copiedText = 'Copied!';

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(fileName)).toBeVisible();
  await userEvent.click(canvas.queryAllByRole('button')[0]);
  await expect(canvas.getByText(copiedText)).toBeVisible();
};

const SingleLine = SingleLineTemplate.bind({});
SingleLine.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(fileName)).toBeVisible();
  await userEvent.click(canvas.queryAllByRole('button')[0]);
  await expect(canvas.getByText(copiedText)).toBeVisible();
};

const LeadingAndTrailingToolbar = LeadingAndTrailingToolbarTemplate.bind({});
LeadingAndTrailingToolbar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(fileName)).toBeVisible();
  await expect(canvas.getByText('Download')).toBeVisible();
  await userEvent.click(canvas.queryAllByRole('button')[0]);
  await userEvent.click(canvas.queryAllByRole('button')[1]);
  await expect(canvas.getByText(copiedText)).toBeVisible();
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { LeadingAndTrailingToolbar, Primary, SingleLine };

SingleLine.args = {
  code: 'pnpm install @browserstack@1.0.0',
  singleLine: true
};

LeadingAndTrailingToolbar.args = {
  toolbar: (
    <CodeSnippetToolbar
      leadingNode={
        <div className="flex items-center space-x-2">
          <div>
            <MdOutlineInsertDriveFile className="text-base-500 h-5 w-5" />
          </div>
          <div>index.tsx</div>
        </div>
      }
      trailingNode={
        <div className="flex">
          <Button
            icon={<MdOutlineFileDownload className="h-5 w-5" />}
            size="default"
            variant="minimal"
            colors="white"
          >
            Download
          </Button>
        </div>
      }
    />
  )
};