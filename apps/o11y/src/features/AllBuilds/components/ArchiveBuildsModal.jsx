import React, { useMemo, useState } from 'react';
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
import { o11yNotify } from 'utils/notification';

import { archiveBuilds } from '../slices/buildsSlice';

function ArchiveBuildsModal() {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const data = useSelector(getModalData);
  const [inputVal, setInputVal] = useState('');
  const [isSubmittingData, setIsSubmittingData] = useState(false);

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
            title: `Build archiving successful`,
            type: 'loading'
          });
        })
        .catch(() => {
          o11yNotify({
            title: `Something went wrong. Please try again`,
            type: 'error'
          });
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
          title="The builds will become read only and can not be reverted"
        />
        <ul className="mt-8 flex flex-col gap-6">
          <li className="flex gap-3">
            <MdMobiledataOff className="text-base-500 mt-1 shrink-0 text-xl" />
            <span className="text-sm leading-5">
              The smart tags calculations (flaky, always failing etc.) of
              subsequent runs will ignore data from this build
            </span>
          </li>
          <li className="flex gap-3">
            <MdDisabledVisible className="text-base-500 mt-1 shrink-0 text-xl" />
            <span className="text-sm leading-5">
              Test data of this build runs will be ignored from all Testing
              Trends and Suite Health dashboards.
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
          Archive
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default ArchiveBuildsModal;
