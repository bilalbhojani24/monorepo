import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import GridListWImage from './index';

const defaultConfig = {
  title: 'Application/Components/GridListWImage',
  component: GridListWImage,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import GridListWImage from 'bifrost/GridListWImage'"
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
    image: {
      defaultValue:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
    },
    label: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'Image desc'
    },
    subText: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'Random'
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    },
    imageClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to image component'
    }
  },
  controls: {}
};
const Template = (args) => <GridListWImage {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const GridExample = () => (
  <div
    role="list"
    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    aria-busy="true"
  >
    <GridListWImage
      label="Lorem"
      subText="15/11/12"
      image="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
    />
    <GridListWImage
      label="Ipsum"
      subText="07/05/23"
      image="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
    />
    <GridListWImage
      label="Dolor"
      subText="09/03/99"
      image="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
    />
    <GridListWImage
      label="Siet"
      subText="02/08/24"
      image="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
    />
  </div>
);

export default defaultConfig;
export { Primary };
