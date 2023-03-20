import { useNavigate } from 'react-router-dom';

const useRecentTests = () => {
  const navigateToPath = useNavigate();

  const navigateToTestHistory = () => {
    navigateToPath('/testHistory');
  };

  return {
    navigateToTestHistory
  };
};

export default useRecentTests;
