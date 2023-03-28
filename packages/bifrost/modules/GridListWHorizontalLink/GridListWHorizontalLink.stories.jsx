import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { HomeIcon } from '../Icon';

import GridListWHorizontalLink from './index';

const defaultConfig = {
  title: 'Application/Components/GridListWHorizontalLink',
  component: GridListWHorizontalLink,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import GridListWHorizontalLink from 'bifrost/GridListWHorizontalLink'"
          }
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=182-39749&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'title of card component',
      defaultValue: 'Lorem'
    },
    image: {
      defaultValue: <HomeIcon className="h-5 w-5" />
    },
    subTitle: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'title of card component',
      defaultValue:
        'ipsum vero nam eligendi libero quia doloremque hic voluptatem, molestias cum cumque nesciunt odio, necessitatibus temporibus repudiandae mollitia adipisci, error accusantium?'
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    }
  },
  controls: {}
};
const Template = (args) => <GridListWHorizontalLink {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const GridExample = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <GridListWHorizontalLink
      title="lorem"
      image={<HomeIcon className="h-5 " />}
      subTitle="another random desc"
    />
    <GridListWHorizontalLink
      title="ipsum"
      image={<HomeIcon className="h-5 " />}
      subTitle="A random desc"
    />
    <GridListWHorizontalLink
      title="lorem"
      image={<HomeIcon className="h-5 " />}
      subTitle="another random desc"
    />
    <GridListWHorizontalLink
      title="ipsum"
      image={<HomeIcon className="h-5 " />}
      subTitle="A random desc"
    />
  </div>
);

export default defaultConfig;
export { Primary };
