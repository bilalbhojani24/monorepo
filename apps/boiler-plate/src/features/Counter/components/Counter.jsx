import React from 'react';
import {
  Button,
  useErrorBoundary,
  withErrorBoundary
} from '@browserstack/bifrost';

import useCounter from './useCounter';

import '../styles/Counter.scss';

const Counter = () => {
  const [error] = useErrorBoundary();

  const { count, incrementCount, decrementCount } = useCounter();

  if (error) {
    return (
      <div className="bg-danger-200 text-danger-900 bold absolute flex h-full w-full flex-col content-between items-center justify-center space-y-2">
        <h1 className="text-6xl">Something went wrong...</h1>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="bg-base-200 flex h-screen items-center justify-center">
      <Button aria-label="Increment value" onClick={incrementCount}>
        Increment
      </Button>

      <span className="mx-4">{count}</span>

      <Button aria-label="Decrement value" onClick={decrementCount}>
        Decrement
      </Button>
    </div>
  );
};
export default withErrorBoundary(Counter);
