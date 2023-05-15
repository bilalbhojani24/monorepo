import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ErrorBoundary, {
  ErrorBoundary as ErrorBoundarySheild,
  useErrorBoundary,
  withErrorBoundary
} from './index';

const defaultConfig = {
  title: 'Application/Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ErrorBoundary from 'bifrost/ErrorBoundary'"}
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <ErrorBoundary {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;

const DemoComponent = () => {
  const [error, resetError] = useErrorBoundary(
    // You can optionally log the error to an error reporting service
    (err, errorInfo) => {
      console.log('error', err);
      console.log('error-info', errorInfo);
    }
  );

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <button type="button" onClick={resetError}>
          Try again
        </button>
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  return <div>DemoComponent - {contextHooks}</div>;
};

const ContextAndHooks = () => (
  <ErrorBoundarySheild
    fallbackUI={
      <div className="bg-danger-200 text-danger-900 bold absolute flex h-full w-full content-between items-center justify-center text-6xl">
        <h1>Fallback UI</h1>
      </div>
    }
  >
    <DemoComponent />
  </ErrorBoundarySheild>
);

const HOCAndHooksComponent = () => {
  const [data, setData] = useState();
  const [error, resetError] = useErrorBoundary((err, errorInfo) => {
    console.log('error', err);
    console.log('error-info', errorInfo);
  });

  if (error) {
    return (
      <div className="bg-danger-200 text-danger-900 bold content-between items-center justify-center">
        <h1>Fallback UI</h1>
        <p>{error.message}</p>
        <button
          type="button"
          onClick={() => {
            resetError();
            setData([1, 2, 3]);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  return <div>HOCAndHooks - {data.map((item) => item)}</div>;
};

const HOCAndHooks = withErrorBoundary(HOCAndHooksComponent);

export { ContextAndHooks, HOCAndHooks };
