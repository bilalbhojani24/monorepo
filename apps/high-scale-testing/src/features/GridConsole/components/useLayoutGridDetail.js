import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

const useLayoutGridDetail = () => {
  const navigate = useNavigate();
  const params = useParams();

  const paramId = params.id; // grid id

  const tabToOpen = 'Overview';

  const [tabName, setTabName] = useState(tabToOpen);

  useEffect(() => {
    navigate(`/grid-console/grid/${paramId}/${tabName.toLowerCase()}`);
  }, [paramId, tabName]);

  return { setTabName, tabName };
};

export default useLayoutGridDetail;
