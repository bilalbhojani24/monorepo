import React from 'react';
import StackedListWStickyHeadings from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const list = [
  {
    heading: 'A',
    contents: [
      {
        id: 1,
        title: 'Leslie Abbott',
        subTitle: 'Co-Founder / CEO',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
      {
        id: 2,
        title: 'Hector Adams',
        subTitle: 'VP, Marketing',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
    ],
  },
  {
    heading: 'C',
    contents: [
      {
        id: 8,
        title: 'Jeffrey Clark',
        subTitle: 'Senior Art Director',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
      {
        id: 9,
        title: 'Kathryn Cooper',
        subTitle: 'Associate Creative Director',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
    ],
  },
  {
    heading: 'E',
    contents: [
      {
        id: 10,
        title: 'Alicia Edwards',
        subTitle: 'Junior Copywriter',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
      {
        id: 11,
        title: 'Benjamin Emerson',
        subTitle: 'Director, Print Operations',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
      {
        id: 12,
        title: 'Jillian Erics',
        subTitle: 'Designer',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
      {
        id: 13,
        title: 'Chelsea Evans',
        subTitle: 'Human Resources Manager',
        avatar: (
          <img
            className="h-10 w-10 rounded-full"
            src={
              'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            }
            alt=""
          />
        ),
      },
    ],
  },
];

const defaultConfig = {
  title: 'Application/Components/StackedListWStickyHeadings',
  component: StackedListWStickyHeadings,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={"import StackedListWStickyHeadings from 'bifrost/StackedListWStickyHeadings'"}
          />
        );
      },
    },
  },
  argTypes: {
    list: {
      defaultValue: list,
      type: { summary: 'OBJECT', required: true },
      description:
        'List of items to be covered in Stacked list, NOTE: in order to make headings stick to the top of the component, make sure the height of parent component of StackedListWStickHeadings is fixed and less than StackedListWStickHeadings',
      control: { type: 'object' },
    },
    avatarVisible: {
      control: { type: 'boolean' },
      description: 'Hide/Show avatar',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: true,
    },
  },
  controls: {},
};
const Template = (args) => <StackedListWStickyHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
