import React from 'react';
import { getLocalTimeZone, today } from '@internationalized/date';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SingleDatepicker from './index';

const defaultConfig = {
  title: 'Application/Components/SingleDatepicker',
  component: SingleDatepicker,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SingleDatepicker from 'bifrost/SingleDatepicker'"
          }
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/branch/PjUFSaMC3jRkjNmrTzmuBJ/Tailwind-UI-Library?node-id=6559-12952&t=vnyEdJ6AFMrSUt2X-0'
    }
  },
  argTypes: {
    errorMessage: {
      defaultValue: ''
    },
    disabled: {
      defaultValue: false
    },
    disabledMessage: {
      defaultValue: 'Datepicker has been disabled'
    },
    onChange: {},
    offset: {
      defaultValue: 0
    },
    crossOffset: {
      defaultValue: 0
    },
    placement: {
      defaultValue: 'bottom end'
    },
    label: {
      defaultValue: 'Sometimes'
    }
  },
  controls: {}
};
const Template = (args) => <SingleDatepicker {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const autoFlipDatepickerExample = (args) => (
  <>
    <h1 className="text-3xl">This example works best in full view</h1>
    <p className="my-6">
      The SingleDatePicker attempts to flip content on the main axis in
      situations where the original placement would cause it to render out of
      view. To see this in action, scroll to the bottom of the page and open the
      date-picker
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, suscipit
      nostrum. Suscipit perferendis vitae corporis vel repellendus assumenda et
      voluptatum laboriosam ipsam a harum, temporibus dolor dicta, cumque,
      voluptate iste. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Eaque, suscipit nostrum. Suscipit perferendis vitae corporis vel
      repellendus assumenda et voluptatum laboriosam ipsam a harum, temporibus
      dolor dicta, cumque, voluptate iste. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Eaque, suscipit nostrum. Suscipit
      perferendis vitae corporis vel repellendus assumenda et voluptatum
      laboriosam ipsam a harum, temporibus dolor dicta, cumque, voluptate iste.
    </p>
    <SingleDatepicker {...args} />
  </>
);

export const DatepickerMinMaxDateExample = (args) => (
  <>
    <p className="mb-6">
      This example uses{' '}
      <code className="bg-base-900 rounded p-1 text-white">
        @internationalized/date
      </code>{' '}
      package to assign min and max date
    </p>
    <SingleDatepicker
      minValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone()).add({ weeks: 1 })}
      {...args}
    />
  </>
);

export default defaultConfig;
export { Primary };
