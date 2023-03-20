import React from 'react';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon
} from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Badge from '../Badge';
import StackedListCommon from '../StackedListCommon';
import StackedListGroup from '../StackedListGroup';
import StackedListItem from '../StackedListItem';

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
  argTypes: {},
  controls: {}
};

const Template = (args) => <StackedList {...args} />;

const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
Primary.args = {
  children: (
    <StackedListGroup>
      <StackedListItem>
        <StackedListCommon
          icon={
            <img
              alt="Person One"
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          }
          title="Velit placeat sit ducimus non sed"
          subTitle={
            <span className="text-base-500 text-sm">Gloria Roberston</span>
          }
        />
      </StackedListItem>
      <StackedListItem>
        <StackedListCommon
          icon={
            <img
              alt="Person"
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          }
          title="Velit placeat sit ducimus non sed"
          subTitle={
            <span className="text-base-500 text-sm">Gloria Roberston</span>
          }
        />
      </StackedListItem>
    </StackedListGroup>
  )
};

const WithStickyHeadings = Template.bind({});
WithStickyHeadings.args = {
  footer: (
    <div className="border-base-100 border-t-2 bg-white py-3 text-center">
      <button
        className="rounded-md bg-black px-4 py-2 text-white "
        type="button"
      >
        My Button
      </button>
    </div>
  ),
  children: (
    <>
      <StackedListGroup heading="A">
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
      </StackedListGroup>
      <StackedListGroup heading="B">
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
        <StackedListItem>
          <StackedListCommon
            icon={
              <img
                alt="Person One"
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            }
            title="Velit placeat sit ducimus non sed"
            subTitle={
              <span className="text-base-500 text-sm">Gloria Roberston</span>
            }
          />
        </StackedListItem>
      </StackedListGroup>
    </>
  )
};
WithStickyHeadings.parameters = {
  controls: {}
};

const TwoColumnsWithAvatar = Template.bind({});
TwoColumnsWithAvatar.args = {
  children: (
    <StackedListGroup>
      <StackedListItem
        variant="card"
        actions={<ChevronRightIcon className="fill-base-500 h-6 w-6" />}
        hideContentInSmallWidth
      >
        <StackedListCommon
          icon={
            <img
              alt="Person One"
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          }
          title="Ricardo Cooper"
          subTitle={
            <span className="text-base-500 mt-1 flex text-sm">
              <EnvelopeIcon
                className="text-base-400 mr-1.5 h-5 w-5 shrink-0 "
                aria-hidden="true"
              />
              <span className="truncate">ricardo.cooper@example.com</span>
            </span>
          }
        />
        <StackedListCommon
          title="Velit placeat sit ducimus non sed"
          subTitle={
            <span className="text-base-500 text-sm">Gloria Roberston</span>
          }
        />
      </StackedListItem>
    </StackedListGroup>
  )
};

const TwoColumnsWithAsideContent = Template.bind({});
TwoColumnsWithAsideContent.args = {
  children: (
    <StackedListGroup>
      <StackedListItem variant="card">
        <StackedListCommon
          icon={
            <img
              alt="Person One"
              className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          }
          title={<span className="text-brand-600">Ricardo Cooper</span>}
        />
        <StackedListCommon
          subTitle={
            <span className="text-base-500 mt-1 flex text-sm">
              <CheckCircleIcon className="fill-success-500 h-5 w-5" />
              <span className="ml-2 ">I am a subtitle</span>
            </span>
          }
          align="right"
          contentAside={<Badge modifier="primary" text="Aside content" />}
        />
      </StackedListItem>
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
        Action
      </button>
    </div>
  ),
  children: (
    <StackedListGroup>
      <StackedListItem>
        <StackedListCommon
          title={
            <a className="hover:underline" href="#/">
              Velit placeat sit ducimus non sed
            </a>
          }
          subTitle={
            <p className="text-base-600 mt-1 whitespace-normal text-sm">
              Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.
            </p>
          }
        />
      </StackedListItem>
      <StackedListItem>
        <StackedListCommon
          title={
            <a className="hover:underline" href="#/">
              Velit placeat sit ducimus non sed
            </a>
          }
          subTitle={
            <p className="text-base-600 mt-1 whitespace-normal text-sm">
              Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.
            </p>
          }
        />
      </StackedListItem>
    </StackedListGroup>
  )
};

const ContentLinksWithAsideContent = Template.bind({});
ContentLinksWithAsideContent.args = {
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
      <StackedListItem>
        <StackedListCommon
          title={
            <a className="hover:underline" href="#/">
              Velit placeat sit ducimus non sed
            </a>
          }
          contentAside={<span className="text-base-500 text-sm">1d ago</span>}
          subTitle={
            <p className="text-base-600 mt-1 whitespace-normal text-sm">
              Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.
            </p>
          }
        />
      </StackedListItem>
      <StackedListItem>
        <StackedListCommon
          title={
            <a className="hover:underline" href="#/">
              Velit placeat sit ducimus non sed
            </a>
          }
          contentAside={<span className="text-base-500 text-sm">1d ago</span>}
          subTitle={
            <p className="text-base-600 mt-1 whitespace-normal text-sm">
              Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.
            </p>
          }
        />
      </StackedListItem>
    </StackedListGroup>
  )
};

export default defaultConfig;
export {
  ContentLinksWithAction,
  ContentLinksWithAsideContent,
  Primary,
  TwoColumnsWithAsideContent,
  TwoColumnsWithAvatar,
  WithStickyHeadings
};
