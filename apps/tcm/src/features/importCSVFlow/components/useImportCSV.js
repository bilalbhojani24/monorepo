import { useSelector } from 'react-redux';

// import { setCSVImportSteps } from '../slices/importCSVSlice';

const useImportCSV = () => {
  const importCSVSteps = useSelector((state) => state.importCSV.importCSVSteps);
  const currentCSVScreen = useSelector(
    (state) => state.importCSV.currentCSVScreen
  );

  return {
    currentCSVScreen,
    importCSVSteps
  };
};

export default useImportCSV;
