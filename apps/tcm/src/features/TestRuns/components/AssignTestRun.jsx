import React, { useEffect } from 'react';
import {
  TMAlerts,
  TMButton,
  TMComboBox,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import useAddEditTestRun from './useAddEditTestRun';
import useMiscConnections from './useMiscConnections';
import useTestRuns from './useTestRuns';

const AssignTestRun = () => {
  const { usersArrayMapped } = useAddEditTestRun();
  const { initFormValues } = useTestRuns();

  const {
    selectedTestRun,
    assignTestRunHandler,
    isAssignTestVisible,
    selectedAssignee,
    setAssignee,
    closeAll
  } = useMiscConnections();

  useEffect(() => {
    if (isAssignTestVisible) initFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAssignTestVisible]);

  return (
    <TMModal
      show={isAssignTestVisible}
      withDismissButton
      onOverlayClick={closeAll}
    >
      <TMModalHeader
        heading={`Assign '${selectedTestRun?.name}'`}
        subHeading=""
        handleDismissClick={closeAll}
      />
      <TMModalBody>
        <div className="mb-4 w-full">
          <TMComboBox
            checkPosition="right"
            label="Assign To"
            placeholder="Select from options"
            value={
              selectedAssignee?.value
                ? usersArrayMapped?.find(
                    (item) => item.value === selectedAssignee.value
                  )
                : null
            }
            options={usersArrayMapped}
            onChange={(data) => setAssignee(data)}
          />
        </div>
        {selectedAssignee?.label && (
          <TMAlerts
            modifier="primary"
            linkText={null}
            description={`'${selectedTestRun?.name}' will be assigned to ${selectedAssignee?.label}`}
          />
        )}
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={closeAll}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={assignTestRunHandler}
        >
          Assign
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AssignTestRun.propTypes = {};

AssignTestRun.defaultProps = {};

export default AssignTestRun;
