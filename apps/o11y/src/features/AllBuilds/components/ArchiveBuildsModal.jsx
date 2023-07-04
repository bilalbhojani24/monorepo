import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDisabledVisible, MdMobiledataOff } from '@browserstack/bifrost';
import {
  O11yAlerts,
  O11yButton,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import { archiveBuilds } from '../slices/buildsSlice';
import { fetchFreshBuilds } from '../utils/common';

function ArchiveBuildsModal() {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const data = useSelector(getModalData);
  const [inputVal, setInputVal] = useState('');
  const [isSubmittingData, setIsSubmittingData] = useState(false);

  useEffect(() => {
    if (data?.builds?.length) {
      logOllyEvent({
        event: 'O11yBuildArchiveClicked',
        data: {
          builds_archived: data.builds.length
        }
      });
    }
  }, [data?.builds?.length]);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleInput = (e) => {
    setInputVal(e.target.value);
  };

  const isValid = useMemo(
    () => inputVal?.toLowerCase() === 'archive',
    [inputVal]
  );

  const handleArchiveBuild = () => {
    if (isValid && (data?.builds?.length || data?.hasSelectedAll)) {
      setIsSubmittingData(true);
      dispatch(
        archiveBuilds({
          projectNormalisedName: activeProject?.normalisedName,
          ...data
        })
      )
        .unwrap()
        .then(() => {
          o11yNotify({
            title: `Build archive successful.`,
            description:
              'The smart tags of subsequent runs are being re-calculated and will be updated shortly.',
            type: 'success'
          });
          logOllyEvent({
            event: 'O11yBuildArchiveExecuted',
            data: {
              builds_archived: data.builds.length
            }
          });
          dispatch(fetchFreshBuilds());
          handleCloseModal();
        })
        .finally(() => {
          setIsSubmittingData(false);
        });
    }
  };

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Archive build run"
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <O11yAlerts
          accentBorder={false}
          modifier="warn"
          title="Archiving is a permanent action and cannot be undone. "
          description="Archived build runs become read-only and cannot be modified."
        />
        <ul className="mt-8 flex flex-col gap-6">
          <li className="flex gap-3">
            <MdMobiledataOff className="text-base-500 mt-1 shrink-0 text-xl" />
            <span className="text-sm leading-5">
              The smart tag calculations(flaky, always failing etc.) for
              subsequent build runs will not consider data from archived build
              runs.
            </span>
          </li>
          <li className="flex gap-3">
            <MdDisabledVisible className="text-base-500 mt-1 shrink-0 text-xl" />
            <span className="text-sm leading-5">
              Test data from archived build runs is excluded from Testing Trends
              and Suite Health dashboards.
            </span>
          </li>
        </ul>
        <div className="mt-8">
          <p className="mb-1 text-sm">
            Please type <span className="font-medium">Archive</span> to confirm
          </p>
          <O11yInputField
            label=""
            id="auth-token-value"
            placeholder=""
            value={inputVal}
            onChange={handleInput}
          />
        </div>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!isValid}
          loading={isSubmittingData}
          isIconOnlyButton={isSubmittingData}
          onClick={handleArchiveBuild}
          colors="danger"
          type="submit"
        >
          Archive {data?.builds?.length} build run
          {data?.builds?.length > 1 ? 's' : ''}
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default ArchiveBuildsModal;
