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
import Button from '../Button';
import HyperLink from '../Hyperlink';
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
                subTitle={email}
              />
            </StackedListItem>
          ))}
        </StackedListGroup>
      ),
      option: {
        type: null
      },
      description:
        'Should provide the content of list items that written using `StackedListGroup`, `StackedLisItem` and `StackedListCommon` components'
    },
    isCard: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    footer: {
      defaultValue: (
        <Button variant="primary" colors="white" fullWidth wrapperClassName="">
          View all
        </Button>
      ),
      option: {
        type: null
      },
      description:
        'For displaying a sticky footer to render buttons or any custom nodes'
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
  footer: null,
  children: (
    <StackedListGroup>
      {People.map(({ email, name, image }) => (
        <StackedListItem key={email}>
          <StackedListCommon
            icon={
              <img alt={name} className="h-10 w-10 rounded-full" src={image} />
            }
            title={name}
            subTitle={email}
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const WithStickyHeadings = Template.bind({});
WithStickyHeadings.args = {
  children: GroupedPeople.map(({ title, people }) => (
    <StackedListGroup key={title} heading={title} wrapperClassName="">
      {people.map(({ name, image, info }) => (
        <StackedListItem focusParentOnChildFocused>
          <HyperLink wrapperClassName="focus:outline-none font-normal">
            <StackedListCommon
              icon={
                <img
                  alt="Person One"
                  className="h-10 w-10 rounded-full"
                  src={image}
                />
              }
              title={name}
              subTitle={info}
            />
          </HyperLink>
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
          focusParentOnChildFocused
        >
          <HyperLink
            wrapperClassName="focus:outline-none font-normal text-base-900"
            href="https://www.google.com"
          >
            {/* Add span only if want to make parent container as target to open link */}
            <span className="absolute inset-0" aria-hidden="true" />
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
                <span className="mt-2 flex">
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
                <span className="mt-2 flex">
                  <CheckCircleIcon className="fill-success-400 mr-2 h-5 w-5" />
                  {statusText}
                </span>
              }
            />
          </HyperLink>
        </StackedListItem>
      ))}
    </StackedListGroup>
  ),
  footer: null
};

const WithRightJustifiedSecondColumn = Template.bind({});
WithRightJustifiedSecondColumn.args = {
  isCard: true,
  children: (
    <StackedListGroup wrapperClassName="shadow rounded-md">
      {JobTitles.map((job, index) => (
        <StackedListItem key={job} focusParentOnChildFocused>
          <HyperLink wrapperClassName="focus:outline-none font-normal">
            {/* Add span only if want to make parent container as target to open link */}
            <span className="absolute inset-0" aria-hidden="true" />
            <StackedListCommon
              title={<span className="text-brand-600 text-base">{job}</span>}
              subTitle={
                <div className="mt-2 flex gap-6">
                  <span className="text-base-500 flex">
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
          </HyperLink>

          <StackedListCommon
            subTitle={
              <span className="mt-1 flex">
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
  ),
  footer: null
};

const ContentLinksWithAction = Template.bind({});
ContentLinksWithAction.args = {
  children: (
    <StackedListGroup>
      {contentList.map(({ title, content }) => (
        <StackedListItem focusParentOnChildFocused>
          <StackedListCommon
            title={
              <HyperLink wrapperClassName="focus:none font-normal text-base-900">
                {title}
                {/* Add span only if want to make parent container as target to open link */}
                <span className="absolute inset-0" aria-hidden="true" />
              </HyperLink>
            }
            subTitle={
              <p className="line-clamp-1 text-base-600 mt-1 whitespace-normal text-sm">
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
  footer: null,
  isCard: true,
  children: (
    <StackedListGroup>
      {contentLinks.map(({ time, title, subTitle, content }) => (
        <StackedListItem focusParentOnChildFocused>
          <StackedListCommon
            title={
              <HyperLink wrapperClassName="focus:none font-normal text-base-900">
                {title}
                <span className="absolute inset-0" aria-hidden="true" />
              </HyperLink>
            }
            contentAside={time}
            subTitle={
              <>
                <p className="text-base-500 truncate">{subTitle}</p>
                <p className="text-base-600 line-clamp-1 mt-1.5 whitespace-normal text-sm">
                  {content}
                </p>
              </>
            }
          />
        </StackedListItem>
      ))}
    </StackedListGroup>
  )
};

const AvatarGroupsWithActions = Template.bind({});
AvatarGroupsWithActions.args = {
  children: (
    <StackedListGroup>
      {AvatarGroupPeople.map(({ image, name, username }) => (
        <StackedListItem
          actions={
            <Button variant="rounded" colors="white">
              View
            </Button>
          }
        >
          <StackedListCommon
            icon={
              <img alt={name} className="h-10 w-10 rounded-full" src={image} />
            }
            title={name}
            subTitle={username}
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
