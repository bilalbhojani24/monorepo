import React from 'react';
import {
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Badge from '../Badge';
import StackedListCommon from '../StackedListCommon';
import StackedListGroup from '../StackedListGroup';
import StackedListItem from '../StackedListItem';

import {
  AvatarGroupPeople,
  contentLinks,
  contentList,
  GroupedPeople,
  JobTitles,
  People,
  PeopleWithTwoCols
} from './const/people';
import StackedList from './index';

const defaultConfig = {
  title: 'Application/Components/StackedList',
  component: StackedList,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import StackedList from 'bifrost/StackedList'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      defaultValue: (
        <StackedListGroup>
          {People.map(({ email, name, image }) => (
            <StackedListItem key={email}>
              <StackedListCommon
                icon={
                  <img
                    alt={name}
                    className="h-10 w-10 rounded-full"
                    src={image}
                  />
                }
                title={name}
                subTitle={
                  <span className="text-base-500 text-sm">{email}</span>
                }
              />
            </StackedListItem>
          ))}
        </StackedListGroup>
      ),
      option: {
        type: null
      }
    },
    footer: {
      default: (
        <div className="bg-white py-3 text-center">
          <button
            className="border-base-300 w-full rounded-md border py-1"
            type="button"
          >
            View all
          </button>
        </div>
      ),
      option: {
        type: null
      }
    }
  },
  controls: {}
};

const Template = (args) => <StackedList {...args} />;

const NarrowWithAvatarGroup = Template.bind({});
NarrowWithAvatarGroup.parameters = {
  controls: {}
};
NarrowWithAvatarGroup.args = {
  children: (
    <StackedListGroup>
      {People.map(({ email, name, image }) => (
        <StackedListItem key={email}>
          <StackedListCommon
            icon={
              <img alt={name} className="h-10 w-10 rounded-full" src={image} />
            }
            title={name}
            subTitle={<span className="text-base-500 text-sm">{email}</span>}
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const WithStickyHeadings = Template.bind({});
WithStickyHeadings.args = {
  children: GroupedPeople.map(({ title, people }) => (
    <StackedListGroup key={title} heading={title}>
      {people.map(({ name, image, info }) => (
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src={image}
              />
            }
            title={name}
            subTitle={<span className="text-base-500 text-sm">{info}</span>}
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  ))
};
WithStickyHeadings.parameters = {
  controls: {}
};

const TwoColumnsWithAvatar = Template.bind({});
TwoColumnsWithAvatar.args = {
  children: (
    <StackedListGroup wrapperClassName="shadow rounded-md">
      {PeopleWithTwoCols.map(({ email, name, image, statusText, info }) => (
        <StackedListItem
          variant="card"
          actions={<ChevronRightIcon className="fill-base-500 h-6 w-6" />}
          hideContentInSmallWidth
          key={email}
        >
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-12 w-12 rounded-full"
                src={image}
              />
            }
            title={<span className="text-brand-600">{name}</span>}
            subTitle={
              <span className="text-base-500 mt-2 flex text-sm">
                <EnvelopeIcon
                  className="text-base-400 mr-1.5 h-5 w-5 shrink-0 "
                  aria-hidden="true"
                />
                <span className="truncate">{email}</span>
              </span>
            }
          />
          <StackedListCommon
            title={info}
            subTitle={
              <span className="text-base-500 mt-2 flex text-sm">
                <CheckCircleIcon className="fill-success-400 mr-2 h-5 w-5" />
                {statusText}
              </span>
            }
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const WithRightJustifiedSecondColumn = Template.bind({});
WithRightJustifiedSecondColumn.args = {
  children: (
    <StackedListGroup>
      {JobTitles.map((job, index) => (
        <StackedListItem key={job} variant="card">
          <StackedListCommon
            title={<span className="text-brand-600">{job}</span>}
            subTitle={
              <div className="mt-2 flex">
                <span className="text-base-500 mr-4 flex">
                  <UsersIcon className="fill-base-400 mr-2 h-5 w-5" />
                  {index === 2 ? 'Design' : 'Engineering'}
                </span>
                <span className="text-base-500 flex">
                  <MapPinIcon className="fill-base-400 mr-2 h-5 w-5" />
                  Remote
                </span>
              </div>
            }
          />
          <StackedListCommon
            subTitle={
              <span className="text-base-500 mt-1 flex text-sm">
                <CalendarIcon className="fill-base-400 h-5 w-5" />
                <span className="ml-2 ">
                  Closing on January {index === 2 ? 14 : 7}, 2020
                </span>
              </span>
            }
            align="right"
            contentAside={<Badge modifier="success" text="Full-time" />}
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const ContentLinksWithAction = Template.bind({});
ContentLinksWithAction.args = {
  footer: (
    <div className="bg-white py-3 text-center">
      <button
        className="border-base-300 w-full rounded-md border py-1"
        type="button"
      >
        View all
      </button>
    </div>
  ),
  children: (
    <StackedListGroup>
      {contentList.map(({ title, content }) => (
        <StackedListItem>
          <StackedListCommon
            title={
              <a className="hover:underline" href="#/">
                {title}
              </a>
            }
            subTitle={
              <p className="line-clamp-2 text-base-600 mt-1 whitespace-normal text-sm">
                {content}
              </p>
            }
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const WithTruncatedContentPreview = Template.bind({});
WithTruncatedContentPreview.args = {
  footer: (
    <div className="bg-white py-3 text-center">
      <button
        className="border-base-300 w-full rounded-md border py-1"
        type="button"
      >
        Action
      </button>
    </div>
  ),
  children: (
    <StackedListGroup>
      {contentLinks.map(({ time, title, subTitle, content }) => (
        <StackedListItem>
          <StackedListCommon
            title={
              <a className="hover:underline" href="#/">
                {title}
              </a>
            }
            contentAside={<span className="text-base-500 text-sm">{time}</span>}
            subTitle={
              <span>
                <p className="truncate">{subTitle}</p>
                <p className="text-base-600 line-clamp-2 mt-1 whitespace-normal text-sm">
                  {content}
                </p>
              </span>
            }
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const AvatarGroupsWithActions = Template.bind({});
AvatarGroupsWithActions.args = {
  footer: (
    <button
      type="button"
      className="hover:bg-base-50 text-base-600 border-base-200 w-full rounded-md border-2 px-3  py-2 font-semibold"
    >
      View all
    </button>
  ),
  children: (
    <StackedListGroup>
      {AvatarGroupPeople.map(({ image, name, username }) => (
        <StackedListItem
          actions={
            <button
              type="button"
              className="hover:bg-base-50 text-base-600 border-base-400 rounded-2xl border px-3  py-1 text-sm font-semibold"
            >
              View
            </button>
          }
        >
          <StackedListCommon
            icon={
              <img alt={name} className="h-10 w-10 rounded-full" src={image} />
            }
            title={name}
            subTitle={<span className="text-base-400">{username}</span>}
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

export default defaultConfig;
export {
  AvatarGroupsWithActions,
  ContentLinksWithAction,
  NarrowWithAvatarGroup,
  TwoColumnsWithAvatar,
  WithRightJustifiedSecondColumn,
  WithStickyHeadings,
  WithTruncatedContentPreview
};
