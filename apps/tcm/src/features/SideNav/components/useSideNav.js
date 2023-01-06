import { useDispatch, useSelector } from 'react-redux';

export default function useSideNav() {
  const allProjects = useSelector((state) => state.global.projects);
  const dispatch = useDispatch();

  return { allProjects };
}
