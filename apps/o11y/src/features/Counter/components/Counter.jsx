import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';

import useCounter from './useCounter';

import '../styles/Counter.scss';

export default function Counter() {
  const { count, incrementCount, decrementCount } = useCounter();

  return (
    <div className="bg-base-200 flex h-screen items-center justify-center">
      <Button aria-label="Increment value" onClick={incrementCount}>
        Increment
      </Button>

      <span className="mx-4">{count}</span>

      <Button aria-label="Decrement value" onClick={decrementCount}>
        Decrement
      </Button>

      <Link to="/projects/rwerwer/builds">View Counter</Link>
    </div>
  );
}
