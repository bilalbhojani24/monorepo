export const LOG_TYPES = {
  NETWORK_LOGS: 'NETWORK_LOGS',
  DEVICE_LOGS: 'DEVICE_LOGS',
  CONSOLE_LOGS: 'CONSOLE_LOGS',
  APPLICATION_LOGS: 'APPLICATION_LOGS',
  STEP: 'STEP',
  FAILURE: 'FAILURE',
  HTTP: 'HTTP',
  TEST_LOG: 'TEST_LOG',
  TEST_SCREENSHOT: 'TEST_SCREENSHOT',
  TEXT_LOGS: 'TEXT_LOGS'
};

export const LOG_LEVELS = {
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING',
  WARN: 'WARN',
  SEVERE: 'SEVERE',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
  FATAL: 'FATAL'
};

export const TEST_DETAILS_TABS = {
  logs: 'Logs',
  info: 'Info'
};

export const TEXT_LOG_CHAR_LIMIT = 10000;

export const TEXT_LOG_HUMANIZE = {
  'GET /session/:sessionId/log/types': 'Get log types',
  'POST /session/:sessionId/log': 'Get logs',
  'POST /session/:sessionId/location': 'Set geo location',
  'GET /session/:sessionId/location': 'Get geo location',
  'POST /session/:sessionId/touch/flick':
    'Flick on the touch screen using finger motion events.',
  'POST /session/:sessionId/touch/longclick': 'Long press',
  'POST /session/:sessionId/touch/doubleclick': 'Double tap',
  'POST /session/:sessionId/touch/scroll':
    'Scroll on the touch screen using finger based motion events.',
  'POST /session/:sessionId/touch/move': 'Move to',
  'POST /session/:sessionId/touch/up': 'Finger up',
  'POST /session/:sessionId/touch/down': 'Finger down',
  'POST /session/:sessionId/touch/click': 'Single tap',
  'GET /session/:sessionId/source': 'Get page source',
  'DELETE /session/:sessionId/cookie/:name': 'Delete cookie',
  'DELETE /session/:sessionId/cookie': 'Delete all cookies',
  'POST /session/:sessionId/cookie': 'Set cookie.',
  'GET /session/:sessionId/cookie': 'Get all cookies',
  'POST /session/:sessionId/window/:windowHandle/maximize': 'Maximize window',
  'GET /session/:sessionId/window/:windowHandle/position':
    'Get window position',
  'POST /session/:sessionId/window/:windowHandle/position':
    'Change window position',
  'GET /session/:sessionId/window/:windowHandle/size': 'Get window size',
  'POST /session/:sessionId/window/:windowHandle/size': 'Change window size',
  'DELETE /session/:sessionId/window': 'Close window',
  'POST /session/:sessionId/window': 'Change window focus',
  'POST /session/:sessionId/frame': 'Change frame focus',
  'POST /session/:sessionId/frame/parent': 'Change focus to parent context',
  'POST /session/:sessionId/ime/activate':
    'Make an engines that is available (appears on the listreturned by getAvailableEngines) active.',
  'POST /session/:sessionId/ime/deactivate': 'De-activates IME engine.',
  'GET /session/:sessionId/ime/activated':
    "Indicates whether IME input is active at the moment (not if it's available).",
  'GET /session/:sessionId/window_handle': 'Get window handle.',
  'POST /session/:sessionId/timeouts/implicit_wait': 'Implicit Wait',
  'POST /session/:sessionId/timeouts':
    'Configure the amount of time that a particular type of operation can execute for before they are aborted and a |Timeout| error is returned to the client.',
  'DELETE /session/:sessionId': 'Delete session.',
  'GET /session/:sessionId': 'Retrieve session capabilities.',
  'GET /sessions': 'Return active sessions.',
  'POST /session': 'Create session.',
  'GET /status': 'Get server status.',
  'GET /session/:sessionId/window_handles':
    'Get all window handles for session',
  'GET /session/:sessionId/url': 'Get URL',
  'POST /session/:sessionId/url': 'Open URL',
  'POST /session/:sessionId/forward': 'Step forward',
  'POST /session/:sessionId/back': 'Step backwards',
  'POST /session/:sessionId/refresh': 'Refresh page.',
  'POST /session/:sessionId/execute': 'Run JavaScript',
  'GET /session/:sessionId/screenshot': 'Take screenshot',
  'GET /session/:sessionId/title': 'Get page title',
  'POST /session/:sessionId/element': 'Find element',
  'POST /session/:sessionId/elements': 'Find multiple elements',
  'POST /session/:sessionId/element/active': 'Get active element',
  'GET /session/:sessionId/element/:id': 'Get element details',
  'POST /session/:sessionId/element/:id/element': 'Find element (from element)',
  'GET /session/:sessionId/element/:id/focus': 'Focus element',
  'POST /session/:sessionId/mouse/moved': 'Mouse moved',
  'POST /session/:sessionId/mouse/pressed': 'Mouse pressed',
  'POST /session/:sessionId/mouse/released': 'Mouse released',
  'POST /session/:sessionId/element/:id/expression': 'Evaluate expression',
  'POST /session/:sessionId/element/:id/elements':
    'Find multiple elements (from element)',
  'POST /session/:sessionId/element/:id/click': 'Click element',
  'POST /session/:sessionId/element/:id/submit': 'Submit FORM',
  'GET /session/:sessionId/element/:id/text': 'Get text',
  'POST /session/:sessionId/element/:id/value': 'Send Keys',
  'POST /session/:sessionId/keys':
    'Send a sequence of key strokes to the active element.',
  'GET /session/:sessionId/element/:id/name': 'Get tag name.',
  'POST /session/:sessionId/element/:id/clear': 'Clear text input',
  'GET /session/:sessionId/element/:id/selected': 'Is selected',
  'GET /session/:sessionId/element/:id/enabled': 'Is enabled',
  'GET /session/:sessionId/element/:id/attribute/:name': 'Get attribute value',
  'GET /session/:sessionId/element/:id/equals/:other':
    'Check if elements are equal',
  'GET /session/:sessionId/element/:id/displayed': 'Is displayed',
  'GET /session/:sessionId/element/:id/location': 'Get location',
  'GET /session/:sessionId/element/:id/size': 'Get size',
  'GET /session/:sessionId/element/:id/css/:propertyName': 'Get CSS value',
  'GET /session/:sessionId/orientation': 'Get orientation',
  'POST /session/:sessionId/orientation': 'Set orientation',
  'GET /session/:sessionId/alert_text': 'Get alert text',
  'POST /session/:sessionId/accept_alert': 'Accept alert',
  'POST /session/:sessionId/dismiss_alert': 'Dismiss alert',
  'POST /session/:sessionId/moveto': 'Move mouse',
  'POST /session/:sessionId/click': 'Click',
  'POST /session/:sessionId/buttondown': 'Click and hold',
  'POST /session/:sessionId/buttonup': 'Release hold',
  'POST /session/:sessionId/doubleclick': 'Double click',
  'GET /session/:sessionId/appium/device/current_package':
    'Get current package',
  'POST /session/:sessionId/appium/device/terminate_app': 'Terminate the app',
  'POST /session/:sessionId/appium/device/activate_app': 'Activate the app',
  'GET /session/:sessionId/appium/device/system_time': 'Get the system time',
  'POST /session/:sessionId/appium/device/app_state':
    'Get app status on device',
  'GET /session/:sessionId/application_cache/status':
    'Getting the status of the html5 application cache',
  'GET /session/:sessionId/session_storage/size':
    'Getting the number of items in the storage',
  'DELETE /session/:sessionId/session_storage/key/:key':
    'Removing the storage item for the given key',
  'POST /session/:sessionId/local_storage':
    'Setting the storage item for the given key',
  'GET /session/:sessionId/local_storage': 'Getting all keys from the storage',
  'POST /session/:sessionId/alert_text':
    'Sending keystrokes to JavaScript prompt() dialog',
  'GET /session/:sessionId/element/:id/location_in_view': 'Get location',
  'GET /session/:sessionId/ime/active_engine':
    'Getting the name of the active IME engine',
  'GET /session/:sessionId/ime/available_engines':
    'Listing all available engines on the machine',
  'POST /session/:sessionId/execute_async': 'Injecting JavaScript',
  'POST /session/:sessionId/timeouts/async_script':
    'Setting timeout for asynchronous scripts',
  'DELETE /session/:sessionId/local_storage': 'Clearing the storage',
  'GET /session/:sessionId/local_storage/key/:key': 'Getting the storage item',
  'DELETE /session/:sessionId/local_storage/key/:key':
    'Removing the storage item',
  'GET /session/:sessionId/local_storage/size':
    'Getting number of items in storage',
  'GET /session/:sessionId/session_storage':
    'Getting all keys from the storage',
  'POST /session/:sessionId/session_storage': 'Setting storage item',
  'DELETE /session/:sessionId/session_storage': 'Clearing the storage',
  'GET /session/:sessionId/session_storage/key/:key': 'Getting storage item',

  'POST /session/:sessionId/file': 'Uploading file',

  'GET /session/:sessionId/context': 'Retrieves the current context',
  'POST /session/:sessionId/context': 'Switches to the given context',
  'GET /session/:sessionId/contexts':
    'Retrieves an array of strings representing available contexts',
  'GET /session/:sessionId/element/:id/pageIndex': 'Get current index of page',
  'GET /session/:sessionId/network_connection':
    'Retrieves the current network connection type',
  'POST /session/:sessionId/network_connection':
    'Sets the network connection to the given type',
  'POST /session/:sessionId/touch/perform':
    'Perform the given touch action sequence',
  'POST /session/:sessionId/touch/multi/perform':
    'Perform the given multi-touch action sequence',
  'POST /session/:sessionId/receive_async_response':
    'Callback url for asynchronous execution of JavaScript',
  'POST /session/:sessionId/appium/device/shake':
    'Perform a shake action on the device',
  'POST /session/:sessionId/appium/device/lock': 'Lock the device',
  'POST /session/:sessionId/appium/device/unlock': 'Unlock the device',
  'POST /session/:sessionId/appium/device/is_locked':
    'Check whether the device is locked or not',
  'POST /session/:sessionId/appium/device/press_keycode':
    'Press a particular key code on the device',
  'POST /session/:sessionId/appium/device/long_press_keycode':
    'Press and hold a particular key code on the device',
  'POST /session/:sessionId/appium/device/keyevent':
    'Send a key code to the device',
  'POST /session/:sessionId/appium/device/rotate':
    'Rotate the device in three dimensions',
  'GET /session/:sessionId/appium/device/current_activity':
    'Retrieve the current activity running on the device',
  'POST /session/:sessionId/appium/device/install_app':
    'Install the given app onto the device',
  'POST /session/:sessionId/appium/device/remove_app':
    'Remove an app from the device',
  'POST /session/:sessionId/appium/device/app_installed':
    'Check whether the specified app is installed on the device',
  'POST /session/:sessionId/appium/device/hide_keyboard':
    'Hide the soft keyboard',
  'POST /session/:sessionId/appium/device/push_file':
    'Place a file onto the device in a particular place',
  'POST /session/:sessionId/appium/device/pull_file':
    "Retrieve a file from the device's file system",
  'POST /session/:sessionId/appium/device/pull_folder':
    "Retrieve a folder from the device's file system",
  'POST /session/:sessionId/appium/device/set_clipboard':
    'Set the content of the system clipboard',
  'POST /session/:sessionId/appium/device/get_clipboard':
    'Get the content of the system clipboard',
  'POST /session/:sessionId/appium/device/toggle_airplane_mode':
    'Switch the state of airplane mode',
  'POST /session/:sessionId/appium/device/toggle_data':
    'Switch the state of data service',
  'POST /session/:sessionId/appium/device/toggle_wifi':
    'Switch the state of the wifi service',
  'POST /session/:sessionId/appium/device/toggle_location_services':
    'Switch the state of the location service',
  'POST /session/:sessionId/appium/device/open_notifications':
    'Open the notifications pane on the device',
  'POST /session/:sessionId/appium/device/start_activity':
    'Start the specified activity on the device',
  'POST /session/:sessionId/appium/simulator/touch_id':
    'Simulate a successful or failed touch id event on the simulator',
  'POST /session/:sessionId/appium/app/launch':
    'Launch the given application on the device',
  'POST /session/:sessionId/appium/app/close': 'Close the given application',
  'POST /session/:sessionId/appium/app/reset':
    'Reset the currently running App',
  'POST /session/:sessionId/appium/app/background':
    'Send the current application to the background',
  'POST /session/:sessionId/appium/app/end_test_coverage':
    'End test coverage on the device',
  'POST /session/:sessionId/appium/app/strings':
    "Retrieve the application's strings file",
  'POST /session/:sessionId/appium/element/:id/value':
    'Retrieve the value from the given element',
  'POST /session/:sessionId/appium/element/:id/replace_value':
    'Replace the value of the given element',
  'GET /session/:sessionId/appium/settings':
    'Retrieve a JSON hash of all the currently specified settings',
  'POST /session/:sessionId/appium/settings':
    'Update the current setting on the device',
  'POST /session/:sessionId/appium/receive_async_response':
    'Callback url for asynchronous execution of JavaScript',
  'POST /session/:sessionId/appium/start_recording_screen':
    'Start recording the screen',
  'POST /session/:sessionId/appium/stop_recording_screen':
    'Stop recording the screen',
  'POST /session/:sessionId/appium/performanceData/types':
    'Returns the information types of the system state which is supported to read as like cpu, memory, network traffic, and battery',
  'POST /session/:sessionId/appium/getPerformanceData':
    'Returns the information of the system state which is supported to read as like cpu, memory, network traffic, and battery',
  'GET /session/:sessionId/appium/device/is_keyboard_shown':
    'Check whether or not the soft keyboard is shown',
  'GET /session/:sessionId/appium/device/system_bars':
    'Retrieve visibility and bounds information of the status and navigation bars',
  'GET /session/:sessionId/appium/device/display_density':
    'Retrieve the display density of the device',
  'POST /session/:sessionId/appium/simulator/toggle_touch_id_enrollment':
    'Toggle enrollment of touch id on the simulator',
  'POST /session/:sessionId/appium/compare_images': 'Compare Images',
  // New commands in the W3C spec.
  // Refer:  https://w3c.github.io/webdriver/webdriver-spec.html#dfn-endpoints
  'POST /session/:sessionId/execute/sync': 'Execute Script',
  'POST /session/:sessionId/execute/async': 'Execute Async Script',
  'POST /session/:sessionId/actions': 'Perform Actions',
  'DELETE /session/:sessionId/actions': 'Release Actions',
  'GET /session/:sessionId/timeouts': 'Get Timeouts',
  'GET /session/:sessionId/window': 'Get Window Handle',
  'GET /session/:sessionId/window/handles': 'Get Window Handles',
  'GET /session/:sessionId/window/rect': 'Get Window Rect',
  'POST /session/:sessionId/window/rect': 'Set Window Rect',
  'POST /session/:sessionId/window/maximize': 'Maximize Window',
  'POST /session/:sessionId/window/minimize': 'Minimize Window',
  'POST /session/:sessionId/window/fullscreen': 'Fullscreen Window',
  'GET /session/:sessionId/element/:id/property/:name': 'Get Element Property',
  'GET /session/:sessionId/element/:id/rect': 'Get element rectangle',
  'GET /session/:sessionId/cookie/:name': 'Get Named Cookie',
  'POST /session/:sessionId/alert/accept': 'Accept Alert',
  'POST /session/:sessionId/alert/dismiss': 'Dismiss Alert',
  'GET /session/:sessionId/alert/text': 'Get Alert Text',
  'POST /session/:sessionId/alert/text': 'Send Alert Text',
  'GET /session/:sessionId/element/:id/screenshot': 'Take Element Screenshot',

  // Custom URL for JS based test frameworks.
  'POST /session/:sessionId/assertion': 'Assert Value',
  'POST /session/:sessionId/press': 'Key Press',

  // New commands 9th Dec 2020
  'POST /session/:sessionId/appium/log_event': 'Log event',
  'POST /session/:sessionId/appium/events': 'Get events',
  'POST /session/:sessionId/appium/execute_driver': 'Execute Driver Script',
  'GET /session/:sessionId/appium/device/app_state': 'Get app state',
  'POST /session/:sessionId/window/new': 'New window'
};
