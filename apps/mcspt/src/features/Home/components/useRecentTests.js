import { useNavigate } from 'react-router-dom';
import { useTestHistory } from 'features/TestHistory';

const useRecentTests = () => {
  const navigateToPath = useNavigate();

  const { tableRows, sessionSelected } = useTestHistory();

  const navigateToTestHistory = () => {
    navigateToPath('/testHistory');
  };

  return {
    navigateToTestHistory,
    recentTestRows: tableRows?.slice(tableRows?.length - 3)?.reverse(),
    sessionSelected
  };
};

export default useRecentTests;
