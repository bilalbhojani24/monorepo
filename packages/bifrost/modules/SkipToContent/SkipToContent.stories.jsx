import React, { useRef } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SkipToContent from './index';

const defaultConfig = {
  title: 'Application/Components/SkipToContent',
  component: SkipToContent,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import SkipToContent from 'bifrost/SkipToContent'"}
        />
      )
    }
  },
  argTypes: {
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    }
  },
  controls: {}
};
const Template = (args) => (
  <SkipToContent {...args}>Skip to main content</SkipToContent>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const SkipToContentExample = () => {
  const targetRef = useRef(null);

  return (
    <div>
      <SkipToContent wrapperClassName="top-2" target={targetRef}>
        Skip to input tag
      </SkipToContent>
      <div ref={targetRef}>
        <p className="mt-10 rounded border p-3">
          Press TAB key on your keyboard to interact, once the `skip to` element
          is visible press ENTER key to see focus jumping to main content, in
          this context an input field
          <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
          necessitatibus ut expedita fugiat porro ad omnis quaerat placeat. Ut,
          molestias rerum. Vero tempora cupiditate, ipsam iste similique
          voluptatum. Ratione, eos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Impedit ab commodi voluptatem excepturi. Laborum
          quae quidem saepe in soluta accusantium beatae nam, obcaecati,
          voluptas non fugit architecto deleniti, autem delectus.
        </p>
        <input
          className="focus:bg-brand-100 mt-10 w-full p-3"
          placeholder="Component focused on click of skip-to-content is the first focusable element of the container"
        />
      </div>
    </div>
  );
};

export default defaultConfig;
export { Primary };
