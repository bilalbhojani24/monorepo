import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '../slices/DashboardSlice';

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
