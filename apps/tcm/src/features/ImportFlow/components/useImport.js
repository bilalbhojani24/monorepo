import { useRef } from 'react';
import { useSelector } from 'react-redux';

const useImport = () => {
  const emailRef = useRef();
  const hostRef = useRef();
  const apiRef = useRef();

  const getUserEmail = useSelector((state) => {
    if (!state.global.user.email) return 'arsalan@browserstack.com';
    return state.global.user?.email;
  });

  const handleTestConnection = () => {
    console.log(
      'inside test connection',
      emailRef.current,
      hostRef.current,
      apiRef.current,
    );
  };

  const handleProceed = () => {
    console.log(
      'inside proceed',
      emailRef.current.value,
      hostRef.current.value,
      apiRef.current.value,
    );
  };

  return {
    apiRef,
    emailRef,
    hostRef,
    getUserEmail,
    handleTestConnection,
    handleProceed,
  };
};

export default useImport;
