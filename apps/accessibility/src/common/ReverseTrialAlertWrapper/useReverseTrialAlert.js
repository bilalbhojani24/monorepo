import { useSelector } from 'react-redux';
import {
  getAlertName,
  getAlertShow
} from 'features/Dashboard/slices/selectors';

export default function useReverseTrialAlert() {
  const alertName = useSelector(getAlertName);
  const showAlert = useSelector(getAlertShow);

  return {
    alertName,
    showAlert
  };
}
