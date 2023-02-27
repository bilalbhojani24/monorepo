const generator = require('component-file-generator');

generator.exec({
  component: {
    root: './modules',
    structure: {
      name: '[name]',
      children: [
        {
          type: 'file',
          name: 'index.jsx',
          content: `import React from 'react';
import PropTypes from 'prop-types';

const [name] = ()=> {
  return <div>[name]</div>;
}; 

[name].propTypes = {}
[name].defaultProps = {}

export default [name];`
        },
        {
          type: 'file',
          name: '[name].stories.jsx',
          content: `import React from 'react';
import [name] from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
    title: 'Application/Components/[name]',
    component: [name],
    parameters: {
        docs: {
        page: () => {
            return <DocPageTemplate importStatement={"import [name] from 'bifrost/[name]'"} />;
        }
        }
    },
    argTypes: {},
    controls: {}
};
const Template = (args) => <[name] {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };`
        }
      ]
    }
  }
});
