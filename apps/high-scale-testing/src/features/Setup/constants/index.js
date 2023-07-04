import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

const DEFAULT_CLOUD_PROVIDER = SCRATCH_RADIO_GROUP_OPTIONS[0];

const LIST_FEED_PROPS = {
  feedIconColor: 'grey',
  feedIconContainerSize: 'sm',
  feedIconSize: 'sm',
  feedIconVariant: 'light'
};

const SHOW_LINE_NUMBERS = false;

const SHOW_SINGLE_LINE = true;

const SUB_TEXTS_OBJECT = {
  intro:
    'Create and manage your own Automation Grid that supports frameworks like Selenium, Playwright, and Cypress to support browser testing at scale',
  scratch: 'Quickly create a grid in below 4 steps.',
  existing: ''
};

export {
  DEFAULT_CLOUD_PROVIDER,
  LIST_FEED_PROPS,
  SHOW_LINE_NUMBERS,
  SHOW_SINGLE_LINE,
  SUB_TEXTS_OBJECT
};
