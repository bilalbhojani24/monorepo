import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProjects } from 'api/projects.api';
import AppRoute from 'const/routes';

import {
  setAddProjectModalVisibility,
  updateProjects,
} from '../slices/projectSlice';

const useProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeProjects = useSelector((state) => state.projects.allProjects);
  const showAddModal = useSelector(
    (state) => state.projects.showAddProjectModal,
  );

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const handleTestRunsClick = (projectId) => () => {
    navigate(`${projectId}${AppRoute.TEST_RUNS}`);
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(`${projectId}${AppRoute.REPO}`);
  };

  const getAllProjects = () => {
    getProjects().then((res) => {
      dispatch(
        updateProjects(
          res.projects.map((data) => ({
            id: `TC${data.id}`,
            projectTitle: data.name,
            quickLinks: (
              <>
                <span
                  onClick={handleTestCasesClick(data.id)}
                  onKeyDown={handleTestCasesClick(data.id)}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer hover:text-brand-600"
                >
                  {data.test_cases_count} Test Cases
                </span>
                <span
                  tabIndex={0}
                  role="button"
                  className="ml-6 cursor-pointer hover:text-brand-600"
                  onClick={handleTestRunsClick(data.id)}
                  onKeyDown={handleTestRunsClick(data.id)}
                >
                  {data.test_runs_count} Test Runs
                </span>
              </>
            ),
            // action: (
            //   <Dropdown
            //     triggerVariant="meatball-button"
            //     dividerRequired
            //     options={[
            //       { id: '1', name: 'Edit Project' },
            //       { id: '2', name: 'Delete' },
            //     ]}
            //   />
            // ),
          })),
        ),
      );
    });
  };

  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    activeProjects,
    showAddModal,
    addingProject,
    getAllProjects,
  };
};

export default useProjects;
