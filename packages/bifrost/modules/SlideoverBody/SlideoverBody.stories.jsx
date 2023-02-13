import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CheckIcon } from '../Icon';

import SlideoverBody from './index';

const SlideoverBodyDummyData = () => (
  <>
    <div className="bg-success-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
      <CheckIcon className="text-success-600 h-6 w-6" aria-hidden="true" />
    </div>
    <div className="mt-3 text-center sm:mt-5">
      <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
        Payment successful
      </h3>
      <div className="mt-2" />
    </div>
  </>
);

const defaultConfig = {
  title: 'Application/Components/SlideoverBody',
  component: SlideoverBody,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SlideoverFooter from '@browserstack/bifrost'"
          }
        />
      )
    }
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          {[...Array(4)].map((itemIndex) => (
            <SlideoverBodyDummyData key={itemIndex} />
          ))}
        </>
      )
    }
  },
  controls: {}
};

const Template = (args) => <SlideoverBody {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
