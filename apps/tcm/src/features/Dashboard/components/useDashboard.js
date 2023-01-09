import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProject } from 'globalSlice/globalSlice';

export default function useDashboard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { projectId };
}
