import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdInfoOutline,
  MdWarningAmber
} from '@browserstack/bifrost';
import {
  O11yButton,
  O11yComboBox,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11yRadioGroup,
  O11ySelectMenu,
  O11ySelectMenuLabel,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { getNumericValue } from 'utils/common';

import {
  ALERT_CONDITION_KEYS,
  ALERT_CONDITION_MAP,
  ALERT_TYPES,
  ALERT_TYPES_INFO,
  APPLICABLE_TO
} from '../constants';
import { getBuildNamesState } from '../slices/selectors';
import { getBuildNamesData } from '../slices/settingsSlice';
import { getWarningInputError } from '../utils';

import AlertStaticBlock from './AlertStaticBlock';

function AddAlertModal() {
  const buildNames = useSelector(getBuildNamesState);
  const activeProject = useSelector(getActiveProject);
  const [selectedTypeOfAlert, setSelectedTypeOfAlert] = useState('');
  const [alertName, setAlertName] = useState('');
  const [selectedApplicableTo, setSelectedApplicableTo] = useState(
    APPLICABLE_TO.all
  );
  const [selectedBuilds, setSelectedBuilds] = useState([]);
  const [warningValue, setWarningValue] = useState('');
  const [criticalValue, setCriticalValue] = useState('');
  const [warningErrorText, setWarningErrorText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeProject.normalisedName) {
      dispatch(
        getBuildNamesData({
          projectNormalisedName: activeProject.normalisedName
        })
      );
    }
  }, [activeProject.normalisedName, dispatch]);

  const buildNamesMenuOptions = useMemo(
    () =>
      buildNames?.data?.map((item) => ({
        label: item,
        value: item
      })) || [],
    [buildNames.data]
  );

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleChangeApplicableTo = (_, id) => {
    setSelectedApplicableTo(APPLICABLE_TO[id]);
  };

  const handleBuildNamesSelect = (items) => {
    setSelectedBuilds(items);
  };

  const handleSelectAlertType = (item) => {
    setSelectedTypeOfAlert(item);
    setCriticalValue('');
    setWarningValue('');
  };

  const handleChangeWarningValue = ({ target: { value } }) => {
    const val = getNumericValue(value);
    if (
      ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.maxValue &&
      val > ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.maxValue
    ) {
      return;
    }
    if (val) {
      setWarningErrorText(
        getWarningInputError({
          warningValue: val,
          criticalValue,
          condition:
            ALERT_TYPES_INFO[selectedTypeOfAlert?.value].criticalWarnRelation
        })
      );
    }
    setWarningValue(val);
  };

  const handleChangeCriticalValue = ({ target: { value } }) => {
    const val = getNumericValue(value);
    if (
      ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.maxValue &&
      val > ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.maxValue
    ) {
      return;
    }
    if (warningValue) {
      setWarningErrorText(
        getWarningInputError({
          warningValue,
          criticalValue: val,
          condition:
            ALERT_TYPES_INFO[selectedTypeOfAlert?.value].criticalWarnRelation
        })
      );
    }
    setCriticalValue(val);
  };

  const handleChangeAlertName = ({ target: { value } }) => {
    setAlertName(value);
  };

  const isFormValid = useMemo(() => {
    if (
      !selectedTypeOfAlert ||
      !alertName ||
      !criticalValue ||
      warningErrorText
    ) {
      return false;
    }
    return !(
      selectedApplicableTo === APPLICABLE_TO.selective &&
      selectedBuilds.length === 0
    );
  }, [
    alertName,
    criticalValue,
    selectedApplicableTo,
    selectedBuilds.length,
    selectedTypeOfAlert,
    warningErrorText
  ]);

  return (
    <O11yModal show size="xl">
      <O11yModalHeader
        dismissButton
        heading="Add Alert"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        <form>
          <O11ySelectMenu
            onChange={handleSelectAlertType}
            value={selectedTypeOfAlert}
            disabled
          >
            <O11ySelectMenuLabel>
              <p className="flex gap-1 text-sm font-medium leading-5">
                <span>Type of alert</span>
                <span className="text-danger-600">*</span>
              </p>
            </O11ySelectMenuLabel>
            <O11ySelectMenuTrigger placeholder="Select.." value="" />
            <O11ySelectMenuOptionGroup>
              {Object.keys(ALERT_TYPES).map((key) => (
                <O11ySelectMenuOptionItem
                  checkPosition="right"
                  key={key}
                  option={{
                    label: ALERT_TYPES_INFO[key].label,
                    value: key
                  }}
                />
              ))}
            </O11ySelectMenuOptionGroup>
          </O11ySelectMenu>
          <p className="text-base-500 mt-2 text-sm font-normal leading-5">
            Create a custom alert from a list of predefined alert categories
            that appear on the Build Insights tab if threshold is breached.
          </p>
          <div className="mt-4">
            <O11yInputField
              label="Alert name *"
              placeholder="Enter alert name"
              value={alertName}
              onChange={handleChangeAlertName}
            />
          </div>
          <p className="text-base-700 mt-4 flex gap-1 text-sm font-medium leading-5">
            <span>Applicable to</span>
            <span className="text-danger-600">*</span>
          </p>
          <p className="text-base-500 mt-1 text-sm font-normal leading-5">
            Select the builds where you want to apply the alerts. Alerts apply
            only to the current project selection.
          </p>
          <div className="mt-4">
            <O11yRadioGroup
              direction="vertical"
              selectedOption={selectedApplicableTo}
              onChange={handleChangeApplicableTo}
              options={Object.values(APPLICABLE_TO)}
            />
          </div>
          {selectedApplicableTo?.id === APPLICABLE_TO.selective.id && (
            <div className="mt-4">
              <O11yComboBox
                label=""
                placeholder="Select a build"
                isMulti
                value={selectedBuilds}
                options={buildNamesMenuOptions}
                onChange={handleBuildNamesSelect}
              />
            </div>
          )}
          {ALERT_TYPES_INFO[selectedTypeOfAlert?.value] && (
            <>
              <p className="text-base-700 mt-4 text-sm font-medium leading-5">
                Alert condition
              </p>
              <p className="text-base-500 text-sm font-normal leading-5">
                {
                  ALERT_TYPES_INFO[selectedTypeOfAlert?.value]
                    ?.alert_condition_text
                }
              </p>
              <div className="mt-4 flex gap-2">
                <AlertStaticBlock
                  label="Level"
                  isMandatory
                  innerText="Critical"
                  wrapperClass="flex-1 flex-shrink-0"
                  boxClass=" bg-base-100"
                  icon={<MdInfoOutline className="text-danger-600 text-xl" />}
                />
                <AlertStaticBlock
                  label="Condition"
                  isMandatory
                  innerText={
                    ALERT_CONDITION_MAP[
                      ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.condition
                    ].formLabel
                  }
                  wrapperClass="flex-1 flex-shrink-0"
                  boxClass=" bg-base-100"
                  icon={
                    ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.condition ===
                    ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL ? (
                      <MdArrowForwardIos className="text-base-600 text-sm" />
                    ) : (
                      <MdArrowBackIos className="text-base-600 text-sm" />
                    )
                  }
                />
                <O11yInputField
                  label={`${
                    ALERT_TYPES_INFO[selectedTypeOfAlert?.value]
                      .placeholder_text
                  } *`}
                  placeholder="Enter numeric value"
                  value={criticalValue}
                  onChange={handleChangeCriticalValue}
                />
              </div>
              <div className="mt-4 flex gap-2">
                <AlertStaticBlock
                  label="Level"
                  innerText="Warning"
                  wrapperClass="flex-1 flex-shrink-0"
                  boxClass=" bg-base-100"
                  icon={
                    <MdWarningAmber className="text-attention-400 text-xl" />
                  }
                />
                <AlertStaticBlock
                  label="Condition"
                  innerText={
                    ALERT_CONDITION_MAP[
                      ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.condition
                    ].formLabel
                  }
                  wrapperClass="flex-1 flex-shrink-0"
                  boxClass=" bg-base-100"
                  icon={
                    ALERT_TYPES_INFO[selectedTypeOfAlert?.value]?.condition ===
                    ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL ? (
                      <MdArrowForwardIos className="text-base-600 text-sm" />
                    ) : (
                      <MdArrowBackIos className="text-base-600 text-sm" />
                    )
                  }
                />
                <O11yInputField
                  label={`${
                    ALERT_TYPES_INFO[selectedTypeOfAlert?.value]
                      .placeholder_text
                  }`}
                  placeholder="Enter numeric value"
                  value={warningValue}
                  onChange={handleChangeWarningValue}
                  errorText={warningErrorText}
                  wrapperClassName="w-48"
                />
              </div>
            </>
          )}
        </form>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton onClick={handleCloseModal} disabled={!isFormValid}>
          Save Changes
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default AddAlertModal;
