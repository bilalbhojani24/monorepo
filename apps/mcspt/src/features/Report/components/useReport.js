import { useSelector } from 'react-redux';

export default function useCounter() {
  const count = useSelector((state) => state.counter.value);

  return { count };
}
