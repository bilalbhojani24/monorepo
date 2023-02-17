// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useReportHeader = () => {
  const navigateToPath = useNavigate();

  const backButtonClicked = () => {
    navigateToPath('/');
  };

  return { backButtonClicked };
};

export default useReportHeader;
