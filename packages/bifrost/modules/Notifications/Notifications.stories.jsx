import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import InputField from '../InputField';

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
      description: 'This is the actions buttons of the notification',
      defaultValue: () => (
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
    body: {
      option: { type: null },
      description:
        'This is the body(content) node for the component. Note: This prop is not be used by speedboats and developed for internal(central) usage only',
      defaultValue: null
    },
    bodyClassName: {
      option: { type: 'string' },
      description:
        'This is the body node wrapperClass. Note: This prop is not be used by speedboats and developed for internal(central) usage only',
      defaultValue: ''
    },
    footer: {
      option: { type: null },
      description:
        'This is the footer(content) node for the component. Note: This prop is not be used by speedboats and developed for internal(central) usage only',
      defaultValue: null
    },
    footerClassName: {
      option: { type: 'string' },
      description:
        'This is the footer node wrapperClass. Note: This prop is not be used by speedboats and developed for internal(central) usage only',
      defaultValue: ''
    },
    description: {
      option: { type: 'string' },
      description: 'This is the subheading(description) for the component',
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
    },
    isCondensed: {
      option: { type: 'boolean' },
      description:
        'This is to enable condensed view where only title and dismiss button is visible',
      defaultValue: false
    },
    handleClose: {
      option: { type: null },
      description:
        'Callback function which will be triggered on cross button click',
      defaultValue: () => {}
    },
    headerIcon: {
      option: { type: null },
      description: 'The header icon node',
      defaultValue: <CheckCircleIcon className="text-base-600 h-6 w-6" />
    },
    title: {
      option: { type: 'string' },
      description: 'This is the title(heading) for the component',
      defaultValue: 'Discussion moved'
    }
  },
  controls: {}
};
const Template = (args) => <Notifications {...args} />;
const BasicTemplate = (args) => <Notifications {...args} />;
const CondensedTemplate = (args) => <Notifications {...args} />;
const FillButtonAndAvatarTemplate = (args) => <Notifications {...args} />;
const NotificationWithBodyContentTemplate = (args) => (
  <Notifications {...args} />
);

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Discussion moved')).toBeVisible();
  const buttons = await canvas.queryAllByRole('button');
  buttons.forEach(async (button) => {
    await userEvent.click(button);
  });
};

const Basic = BasicTemplate.bind({});
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Successfully saved!')).toBeVisible();
  const buttons = await canvas.queryAllByRole('button');
  buttons.forEach(async (button) => {
    await userEvent.click(button);
  });
};

const Condensed = CondensedTemplate.bind({});
Condensed.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Discussion archived')).toBeVisible();
  const buttons = await canvas.queryAllByRole('button');
  buttons.forEach(async (button) => {
    await userEvent.click(button);
  });
};

const FillButtonAndAvatar = FillButtonAndAvatarTemplate.bind({});
FillButtonAndAvatar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText('Emilia Gates')).toBeVisible();
  const buttons = await canvas.queryAllByRole('button');
  buttons.forEach(async (button) => {
    await userEvent.click(button);
  });
};

const NotificationWithBodyContent = NotificationWithBodyContentTemplate.bind(
  {}
);

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  Basic,
  Condensed,
  FillButtonAndAvatar,
  NotificationWithBodyContent,
  Primary
};

Basic.args = {
  actionButtons: null,
  description: 'Anyone with a link can now view this file.',
  title: 'Successfully saved!',
  headerIcon: <CheckCircleIcon className="text-success-400 h-6 w-6" />
};

Condensed.args = {
  actionButtons: () => (
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
  actionButtons: () => (
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

NotificationWithBodyContent.args = {
  actionButtons: null,
  headerIcon: null,
  description: 'Sent you an invite to connect.',
  title: 'Business call',
  body: (
    <InputField id="noti" placeholder="your@gmail.com" label="Business email" />
  ),
  footer: (
    <div className="flex justify-end">
      <Button>Submit</Button>
    </div>
  ),
  bodyClassName: 'pt-0',
  footerClassName: 'bg-base-100'
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
      id : string should be unique [To avoid duplicate],
      size : "sm" | "md" | "lg" [default - sm]
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
              duration: 40000,
              autoClose: true,
              id: 'one',
              size: 'lg'
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
              duration: 4000,
              size: 'md'
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
