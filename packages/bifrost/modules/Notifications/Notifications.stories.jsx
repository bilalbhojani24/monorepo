import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import Notifications from './index';
import { NotificationsContainer, notify } from './notificationsUtils';

const defaultConfig = {
  title: 'Application/Components/Notifications',
  component: Notifications,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Notifications from 'bifrost/Notifications'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=132-36335&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    actionButtons: {
      option: { type: null },
      defaultValue: (toastData) => (
        <>
          <Button variant="minimal" colors="brand">
            Undo
          </Button>
          <Button variant="minimal" wrapperClassName="text-base-600">
            Dismiss
          </Button>
        </>
      )
    },
    description: {
      option: { type: 'string' },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
    },
    isCondensed: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    handleClose: {
      option: { type: null },
      defaultValue: () => {}
    },
    headerIcon: {
      options: { type: null },
      defaultValue: <CheckCircleIcon className="text-base-600 h-6 w-6" />
    },
    title: { option: { type: 'string' }, defaultValue: 'Discussion moved' }
  },
  controls: {}
};
const Template = (args) => <Notifications {...args} />;
const BasicTemplate = (args) => <Notifications {...args} />;
const CondensedTemplate = (args) => <Notifications {...args} />;
const FillButtonAndAvatarTemplate = (args) => <Notifications {...args} />;

const Primary = Template.bind({});
const Basic = BasicTemplate.bind({});
const Condensed = CondensedTemplate.bind({});
const FillButtonAndAvatar = FillButtonAndAvatarTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Basic, Condensed, FillButtonAndAvatar, Primary };

Basic.args = {
  actionButtons: null,
  description: 'Anyone with a link can now view this file.',
  title: 'Successfully saved!',
  headerIcon: <CheckCircleIcon className="text-success-400 h-6 w-6" />
};

Condensed.args = {
  actionButtons: (toastData) => (
    <Button variant="minimal" colors="brand">
      Undo
    </Button>
  ),
  isCondensed: true,
  headerIcon: null,
  description: '',
  title: 'Discussion archived'
};

FillButtonAndAvatar.args = {
  actionButtons: (toastData) => (
    <>
      <Button>Undo</Button>
      <Button variant="primary" colors="white">
        Dismiss
      </Button>
    </>
  ),
  headerIcon: (
    <img
      className="h-10 w-10 rounded-full"
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
      alt=""
    />
  ),
  description: 'Sent you an invite to connect.',
  title: 'Emilia Gates'
};

/**
 * STEPS TO USE STACKED NOTIFICATION
 * import {notify, NotificationContainer} from "@browserstack/bifrost"
 * Add <NotificationContainer /> at the App.js file
 * Now whenever you want to trigger notification call notify() function
 * notify => notify(CustomComponent, optionsObject)
 * optionsObject : {
 *    duration: number, [default - 4000]
      position: 'top-right' | "top-left" | "bottom-left" | "bottom-right", [default - 'top-right']
      ariaProps: {
         role: '',
        'aria-live': '',
      }
      autoClose : true/false, [default - false],
      id : string should be unique [To avoid duplicate]
 * }
 */

export const StackedNotification = () => (
  <>
    <div className="flex h-screen items-center justify-center space-x-3">
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Successfully saved!"
              description="Anyone with a link can now view this file."
              actionButtons={null}
              headerIcon={
                <CheckCircleIcon className="text-success-400 h-6 w-6" />
              }
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'top-left',
              duration: 4000,
              autoClose: true,
              id: 'one'
            }
          )
        }
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Movement"
              isCondensed
              actionButtons={(toastData) => (
                <Button
                  variant="minimal"
                  colors="brand"
                  onClick={() => {
                    console.log(toastData);
                  }}
                >
                  Undo
                </Button>
              )}
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'top-right',
              duration: 4000
            }
          )
        }
      >
        Top Right
      </Button>
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Emilia Gates"
              description="Sent you an invite to connect."
              headerIcon={
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              }
              actionButtons={(toastData) => (
                <>
                  <Button>Undo</Button>
                  <Button
                    variant="primary"
                    colors="white"
                    onClick={() => {
                      notify.remove(toastData.id);
                    }}
                  >
                    Dismiss
                  </Button>
                </>
              )}
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'bottom-left',
              duration: 4000
            }
          )
        }
      >
        Bottom Left
      </Button>
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Movement"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur."
              headerIcon={<CheckCircleIcon className="text-base-600 h-6 w-6" />}
              actionButtons={(toastData) => (
                <>
                  <Button variant="minimal" colors="brand">
                    Undo
                  </Button>
                  <Button
                    variant="minimal"
                    wrapperClassName="text-base-600"
                    onClick={() => {
                      notify.remove(toastData.id);
                    }}
                  >
                    Dismiss
                  </Button>
                </>
              )}
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'bottom-right',
              duration: 4000
            }
          )
        }
      >
        Bottom Right
      </Button>
    </div>

    <NotificationsContainer />
  </>
);

export const MarginTop = () => (
  <>
    <div className="flex h-screen items-center justify-center space-x-3">
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Successfully saved!"
              description="Anyone with a link can now view this file."
              actionButtons={null}
              headerIcon={
                <CheckCircleIcon className="text-success-400 h-6 w-6" />
              }
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'top-left',
              duration: 4000,
              autoClose: true,
              id: 'one'
            }
          )
        }
      >
        Top Left
      </Button>
      <Button
        onClick={() =>
          notify(
            <Notifications
              title="Movement"
              isCondensed
              actionButtons={(toastData) => (
                <Button
                  variant="minimal"
                  colors="brand"
                  onClick={() => {
                    console.log(toastData);
                  }}
                >
                  Undo
                </Button>
              )}
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'top-right',
              duration: 4000
            }
          )
        }
      >
        Top Right
      </Button>
    </div>
    <NotificationsContainer containerStyle={{ top: '100px' }} />
  </>
);
