import { useState, useEffect } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

const useLayoutGridDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const paramId = params.id; // grid id

  let tabToOpen = 'Overview';

  const [tabName, setTabName] = useState(tabToOpen);

  const isOverview = useMatch('/grid-console/grid/:id/overview');
  const isUtilisation = useMatch('/grid-console/grid/:id/utilization');
  const isSettings = useMatch('/grid-console/grid/:id/settings');

  if (isOverview) {
    tabToOpen = 'Overview';
  } else if (isUtilisation) {
    tabToOpen = 'Utilization';
  } else if (isSettings) {
    tabToOpen = 'Settings';
  }

  useEffect(() => {
    navigate(`/grid-console/grid/${paramId}/${tabName.toLowerCase()}`);
  }, [navigate, paramId, tabName]);

  return { setTabName, tabName };
};

export default useLayoutGridDetail;
