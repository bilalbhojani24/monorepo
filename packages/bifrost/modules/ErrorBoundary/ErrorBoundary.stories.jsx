import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ErrorBoundary, {
  ErrorBoundaryContext,
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
  <ErrorBoundaryContext>
    <DemoComponent />
  </ErrorBoundaryContext>
);

const HOCAndHooksComponent = () => {
  const [error, resetError] = useErrorBoundary((err, errorInfo) => {
    console.log('error', err);
    console.log('error-info', errorInfo);
  });

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
  return <div>HOCAndHooks - {hocAndHooks}</div>;
};

const HOCAndHooks = withErrorBoundary(HOCAndHooksComponent);

export { ContextAndHooks, HOCAndHooks };
