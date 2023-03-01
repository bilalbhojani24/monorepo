import { useSelector } from 'react-redux';

export default function useLoginScreen() {
  const loginUrl = useSelector((state) => state.global.loginUrl);

  return { loginUrl };
}
