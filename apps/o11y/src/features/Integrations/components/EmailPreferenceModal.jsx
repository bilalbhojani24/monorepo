import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  O11yButton,
  O11yCheckbox,
  O11yComboBox,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { NOTIFICATION_TYPES } from 'constants/common';
import { getProjects } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import { INTEGRATIONS_PARAMS } from '../constants';
import {
  getEmailPreferencesData,
  submitEmailPreferencesData
} from '../slices/integrationsSlice';

const getFilteredMenuOptions = (projectList, selectedProjects) => {
  const filteredList = projectList.filter(
    (project) =>
      !selectedProjects.find(
        (selectedProject) => selectedProject === project.id
      )
  );

  return filteredList.map((project) => ({
    label: project.name,
    value: project.id
  }));
};

function EmailPreferenceModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector(getProjects);
  const [isUnchanged, setIsUnchanged] = useState(true);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isCheckedDailySummary, setIsCheckedDailySummary] = useState(false);
  const [selectedDailySummaryProjects, setSelectedDailySummaryProjects] =
    useState([]);
  const [dailySummaryProjectMenuOptions, setDailySummaryProjectMenuOptions] =
    useState([]);
  const [isCheckedBuildInsights, setIsCheckedBuildInsights] = useState(false);
  const [selectedBuildInsightsProjects, setSelectedBuildInsightsProjects] =
    useState([]);
  const [buildInsightsProjectMenuOptions, setBuildInsightsProjectMenuOptions] =
    useState([]);

  const handleCloseModal = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(INTEGRATIONS_PARAMS.MANAGE_EMAIL_PREFERENCE);
    navigate({
      search: searchParams.toString()
    });
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const getFormattedMenuOptions = useCallback(
    (projectIds = []) =>
      projectIds.map((projectId) => {
        const foundProject = projects.list.find(
          (project) => project.id === projectId
        );
        return {
          label: foundProject.name,
          value: foundProject.id
        };
      }),
    [projects]
  );

  const handleSelectDailySummaryCheck = ({ target: { checked } }) => {
    setIsUnchanged(false);
    setIsCheckedDailySummary(checked);
  };
  const handleSelectBuildInsightsCheck = ({ target: { checked } }) => {
    setIsUnchanged(false);
    setIsCheckedBuildInsights(checked);
  };

  const handleSelectDailySummaryProjects = (items) => {
    setIsUnchanged(false);
    setSelectedDailySummaryProjects(items);
  };
  const handleSelectBuildInsightsProjects = (items) => {
    setIsUnchanged(false);
    setSelectedBuildInsightsProjects(items);
  };

  const handleSubmit = () => {
    const payload = {
      [NOTIFICATION_TYPES.dailySummary]: {
        isSubscribed: isCheckedDailySummary,
        projects: selectedDailySummaryProjects.map((item) => item.value)
      },
      [NOTIFICATION_TYPES.buildInsights]: {
        isSubscribed: isCheckedBuildInsights,
        projects: selectedBuildInsightsProjects.map((item) => item.value)
      }
    };
    setIsSubmittingData(true);
    dispatch(submitEmailPreferencesData({ payload }))
      .unwrap()
      .then(() => {
        const searchParams = new URLSearchParams(window.location.search);
        logOllyEvent({
          event: 'O11yIntegrationsEmailConfigurationChanged',
          data: {
            daily_summary_enabled: isCheckedDailySummary,
            daily_summary_projects: selectedDailySummaryProjects.length,
            build_insights_enabled: isCheckedBuildInsights,
            build_insights_projects: selectedBuildInsightsProjects.length,
            source: searchParams.get('source') ? 'click' : 'direct'
          }
        });
        o11yNotify({
          title: `Email preferences updated successfully`,
          type: 'success'
        });
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          title: `Failed to update email preferences`,
          type: 'error'
        });
      })
      .finally(() => {
        setIsSubmittingData(false);
      });
  };

  useEffect(() => {
    setIsLoadingInitialData(true);
    dispatch(getEmailPreferencesData())
      .unwrap()
      .then((res) => {
        if (res?.[NOTIFICATION_TYPES.dailySummary]) {
          setIsCheckedDailySummary(
            res[NOTIFICATION_TYPES.dailySummary].isSubscribed
          );
          setSelectedDailySummaryProjects(
            getFormattedMenuOptions(
              res[NOTIFICATION_TYPES.dailySummary].projects
            )
          );
          setDailySummaryProjectMenuOptions([
            ...getFormattedMenuOptions(
              res[NOTIFICATION_TYPES.dailySummary].projects
            ),
            ...getFilteredMenuOptions(
              projects.list,
              res[NOTIFICATION_TYPES.dailySummary].projects
            )
          ]);
        }
        if (res?.[NOTIFICATION_TYPES.buildInsights]) {
          setIsCheckedBuildInsights(
            res[NOTIFICATION_TYPES.buildInsights].isSubscribed
          );
          setSelectedBuildInsightsProjects(
            getFormattedMenuOptions(
              res[NOTIFICATION_TYPES.buildInsights].projects
            )
          );
          setBuildInsightsProjectMenuOptions([
            ...getFormattedMenuOptions(
              res[NOTIFICATION_TYPES.buildInsights].projects
            ),
            ...getFilteredMenuOptions(
              projects.list,
              res[NOTIFICATION_TYPES.buildInsights].projects
            )
          ]);
        }
      })
      .catch(() => {
        const projectMenuOptions = projects.list.map((project) => ({
          label: project.name,
          value: project.id
        }));
        setDailySummaryProjectMenuOptions(projectMenuOptions);
        setBuildInsightsProjectMenuOptions(projectMenuOptions);
      })
      .finally(() => {
        setIsLoadingInitialData(false);
      });
  }, [dispatch, getFormattedMenuOptions, projects.list]);

  const isValid = useMemo(() => {
    if (isUnchanged) {
      return false;
    }
    if (isCheckedBuildInsights && !selectedBuildInsightsProjects.length) {
      return false;
    }
    return !(isCheckedDailySummary && !selectedDailySummaryProjects.length);
  }, [
    isCheckedBuildInsights,
    isCheckedDailySummary,
    isUnchanged,
    selectedBuildInsightsProjects.length,
    selectedDailySummaryProjects.length
  ]);

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Manage email notification preferences "
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        {isLoadingInitialData ? (
          <div className="flex h-40 items-center">
            <O11yLoader />
          </div>
        ) : (
          <>
            <div className="border-b-base-200 border-b pb-5">
              <O11yCheckbox
                border={false}
                data={{
                  description:
                    'Get notified daily of all builds ran through out the day.',
                  label: 'Daily Summary',
                  value: NOTIFICATION_TYPES.dailySummary
                }}
                checked={isCheckedDailySummary}
                description="block"
                onChange={handleSelectDailySummaryCheck}
              />
              <div className="mt-3">
                <O11yComboBox
                  label="Projects"
                  placeholder="Select projects..."
                  isMulti
                  disabled={!isCheckedDailySummary}
                  value={selectedDailySummaryProjects}
                  options={dailySummaryProjectMenuOptions}
                  onChange={handleSelectDailySummaryProjects}
                />
              </div>
            </div>
            <div className="mt-5">
              <O11yCheckbox
                border={false}
                data={{
                  description: 'Get insights of the build on completion.',
                  label: 'Build Insights',
                  value: NOTIFICATION_TYPES.buildInsights
                }}
                checked={isCheckedBuildInsights}
                description="block"
                onChange={handleSelectBuildInsightsCheck}
              />
              <div className="mt-3">
                <O11yComboBox
                  label="Projects"
                  placeholder="Select projects..."
                  isMulti
                  disabled={!isCheckedBuildInsights}
                  value={selectedBuildInsightsProjects}
                  options={buildInsightsProjectMenuOptions}
                  onChange={handleSelectBuildInsightsProjects}
                />
              </div>
            </div>
          </>
        )}
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!isValid}
          loading={isSubmittingData}
          isIconOnlyButton={isSubmittingData}
          onClick={handleSubmit}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default EmailPreferenceModal;
