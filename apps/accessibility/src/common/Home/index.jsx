import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'common/Loader';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/reports');
  }, []);
  return <Loader />;
}
