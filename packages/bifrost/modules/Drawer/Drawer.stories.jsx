import React from 'react';
import Drawer from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Floyd Miles',
    email: 'floy.dmiles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const defaultConfig = {
  title: 'Application/Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Drawer from 'bifrost/Drawer'"} />;
      }
    }
  },
  argTypes: {
    brandingHeader: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    description: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    },
    footer: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    overlay: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    title: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    },
    wider: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    }
  },
  controls: {}
};
const Template = (args) => <Drawer {...args} />;
const FormDrawerTemplate = (args) => <Drawer {...args} />;
const WiderFormDrawerTemplate = (args) => <Drawer {...args} />;

const Primary = Template.bind({});
const FormDrawer = FormDrawerTemplate.bind({});
const WiderFormDrawer = WiderFormDrawerTemplate.bind({});

Primary.parameters = {
  controls: {}
};

FormDrawer.args = {
  bodyNode: (
    <div className="flex flex-1 flex-col justify-between">
      <div className="divide-y divide-base-200 px-4 sm:px-6">
        <div className="space-y-6 pt-6 pb-5">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-base-900">
              Project name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="project-name"
                id="project-name"
                className="block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-base-900">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                defaultValue={''}
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-base-900">Team Members</h3>
            <div className="mt-2">
              <div className="flex space-x-2">
                {team.map((person) => (
                  <a key={person.email} href={person.href} className="rounded-full hover:opacity-75">
                    <img className="inline-block h-8 w-8 rounded-full" src={person.imageUrl} alt={person.name} />
                  </a>
                ))}
                <button
                  type="button"
                  className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-base-200 bg-white text-base-400 hover:border-base-300 hover:text-base-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Add team member</span>
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-base-900">Privacy</legend>
            <div className="mt-2 space-y-5">
              <div className="relative flex items-start">
                <div className="absolute flex h-5 items-center">
                  <input
                    id="privacy-public"
                    name="privacy"
                    aria-describedby="privacy-public-description"
                    type="radio"
                    className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                    defaultChecked
                  />
                </div>
                <div className="pl-7 text-sm">
                  <label htmlFor="privacy-public" className="font-medium text-base-900">
                    Public access
                  </label>
                  <p id="privacy-public-description" className="text-base-500">
                    Everyone with the link will see this project.
                  </p>
                </div>
              </div>
              <div>
                <div className="relative flex items-start">
                  <div className="absolute flex h-5 items-center">
                    <input
                      id="privacy-private-to-project"
                      name="privacy"
                      aria-describedby="privacy-private-to-project-description"
                      type="radio"
                      className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                    />
                  </div>
                  <div className="pl-7 text-sm">
                    <label htmlFor="privacy-private-to-project" className="font-medium text-base-900">
                      Private to project members
                    </label>
                    <p id="privacy-private-to-project-description" className="text-base-500">
                      Only members of this project would be able to access.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative flex items-start">
                  <div className="absolute flex h-5 items-center">
                    <input
                      id="privacy-private"
                      name="privacy"
                      aria-describedby="privacy-private-to-project-description"
                      type="radio"
                      className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                    />
                  </div>
                  <div className="pl-7 text-sm">
                    <label htmlFor="privacy-private" className="font-medium text-base-900">
                      Private to you
                    </label>
                    <p id="privacy-private-description" className="text-base-500">
                      You are the only one able to access this project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="pt-4 pb-6">
          <div className="flex text-sm">
            <a
              href="www.google.com"
              className="group inline-flex items-center font-medium text-brand-600 hover:text-brand-900"
            >
              <LinkIcon className="h-5 w-5 text-brand-500 group-hover:text-brand-900" aria-hidden="true" />
              <span className="ml-2">Copy link</span>
            </a>
          </div>
          <div className="mt-4 flex text-sm">
            <a href="www.google.com" className="group inline-flex items-center text-base-500 hover:text-base-900">
              <QuestionMarkCircleIcon className="h-5 w-5 text-base-400 group-hover:text-base-500" aria-hidden="true" />
              <span className="ml-2">Learn more about sharing</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  ),
  brandingHeader: false,
  description: '',
  footer: true,
  overlay: false,
  title: 'Form',
  wider: false
};

WiderFormDrawer.args = {
  bodyNode: (
    <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-base-200 sm:py-0">
      {/* Project name */}
      <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-base-900 sm:mt-px sm:pt-2">
            Project name
          </label>
        </div>
        <div className="sm:col-span-2">
          <input
            type="text"
            name="project-name"
            id="project-name"
            className="block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Project description */}
      <div className="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div>
          <label htmlFor="project-description" className="block text-sm font-medium text-base-900 sm:mt-px sm:pt-2">
            Description
          </label>
        </div>
        <div className="sm:col-span-2">
          <textarea
            id="project-description"
            name="project-description"
            rows={3}
            className="block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
            defaultValue={''}
          />
        </div>
      </div>

      {/* Team members */}
      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div>
          <h3 className="text-sm font-medium text-base-900">Team Members</h3>
        </div>
        <div className="sm:col-span-2">
          <div className="flex space-x-2">
            {team.map((person) => (
              <a key={person.email} href={person.href} className="flex-shrink-0 rounded-full hover:opacity-75">
                <img className="inline-block h-8 w-8 rounded-full" src={person.imageUrl} alt={person.name} />
              </a>
            ))}

            <button
              type="button"
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-base-200 bg-white text-base-400 hover:border-base-300 hover:text-base-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span className="sr-only">Add team member</span>
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <fieldset className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <legend className="sr-only">Privacy</legend>
        <div className="text-sm font-medium text-base-900" aria-hidden="true">
          Privacy
        </div>
        <div className="space-y-5 sm:col-span-2">
          <div className="space-y-5 sm:mt-0">
            <div className="relative flex items-start">
              <div className="absolute flex h-5 items-center">
                <input
                  id="public-access"
                  name="privacy"
                  aria-describedby="public-access-description"
                  type="radio"
                  className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                  defaultChecked
                />
              </div>
              <div className="pl-7 text-sm">
                <label htmlFor="public-access" className="font-medium text-base-900">
                  Public access
                </label>
                <p id="public-access-description" className="text-base-500">
                  Everyone with the link will see this project
                </p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="absolute flex h-5 items-center">
                <input
                  id="restricted-access"
                  name="privacy"
                  aria-describedby="restricted-access-description"
                  type="radio"
                  className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                />
              </div>
              <div className="pl-7 text-sm">
                <label htmlFor="restricted-access" className="font-medium text-base-900">
                  Private to Project Members
                </label>
                <p id="restricted-access-description" className="text-base-500">
                  Only members of this project would be able to access
                </p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="absolute flex h-5 items-center">
                <input
                  id="private-access"
                  name="privacy"
                  aria-describedby="private-access-description"
                  type="radio"
                  className="h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500"
                />
              </div>
              <div className="pl-7 text-sm">
                <label htmlFor="private-access" className="font-medium text-base-900">
                  Private to you
                </label>
                <p id="private-access-description" className="text-base-500">
                  You are the only one able to access this project
                </p>
              </div>
            </div>
          </div>
          <hr className="border-base-200" />
          <div className="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex-1">
              <a
                href="www.google.com"
                className="group flex items-center space-x-2.5 text-sm font-medium text-brand-600 hover:text-brand-900"
              >
                <LinkIcon className="h-5 w-5 text-brand-500 group-hover:text-brand-900" aria-hidden="true" />
                <span>Copy link</span>
              </a>
            </div>
            <div>
              <a
                href="www.google.com"
                className="group flex items-center space-x-2.5 text-sm text-base-500 hover:text-base-900"
              >
                <QuestionMarkCircleIcon
                  className="h-5 w-5 text-base-400 group-hover:text-base-500"
                  aria-hidden="true"
                />
                <span>Learn more about sharing</span>
              </a>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  ),
  brandingHeader: false,
  description: '',
  footer: true,
  overlay: false,
  title: 'Form',
  wider: true
};

export default defaultConfig;
export { Primary, FormDrawer, WiderFormDrawer };
