import React from 'react';

import useCounter from './useCounter';

import '../styles/Counter.scss';

export default function Counter() {
  const { count, incrementCount, decrementCount } = useCounter();

  return (
    <div className="my-4">
      <div>
        <button
          className="button counter-button button-increment"
          aria-label="Increment value"
          onClick={incrementCount}
        >
          Increment
        </button>

        <span className="mx-4">{count}</span>

        <button
          className="button counter-button button-decrement"
          aria-label="Decrement value"
          onClick={decrementCount}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
