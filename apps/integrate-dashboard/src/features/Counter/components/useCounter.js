import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '../slices/counterSlice';

export default function useCounter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const incrementCount = () => {
    dispatch(increment());
  };

  const decrementCount = () => {
    dispatch(decrement());
  };

  return { count, incrementCount, decrementCount };
}
