import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11yButton,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11ySelectMenu,
  O11ySelectMenuLabel,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import {
  FAILURE_CATEGORIES_INFO,
  FAILURE_CATEGORIES_TYPES
} from '../constants';
import {
  submitNewSubCat,
  updateSubCat
} from '../slices/failureCategoriesSettings';

function AddEditSubCategoryModal() {
  const modalData = useSelector(getModalData);
  const activeProject = useSelector(getActiveProject);
  const [selectedCategoryType, setSelectedCategoryType] = useState('');
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(modalData?.subCatData)) {
      const { subCatData } = modalData;
      setSubCategoryName(subCatData.name);
      setSelectedCategoryType({
        label: FAILURE_CATEGORIES_INFO[subCatData.category].label,
        value: subCatData.category
      });
    }
  }, [modalData]);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSelectFailureCategory = (item) => {
    setSelectedCategoryType(item);
  };

  const handleChangeSubCategoryName = ({ target: { value } }) => {
    if (value.length > 32) {
      return;
    }
    setSubCategoryName(value);
  };

  const isFormValid = useMemo(
    () => !(!selectedCategoryType || !subCategoryName),
    [selectedCategoryType, subCategoryName]
  );

  const handleSubmitChanges = () => {
    if (!isSubmittingData && isFormValid) {
      setIsSubmittingData(true);
      const payload = {
        name: subCategoryName,
        category: selectedCategoryType.value
      };
      dispatch(
        modalData?.action === 'edit'
          ? updateSubCat({
              projectNormalisedName: activeProject.normalisedName,
              payload: { ...payload, id: modalData.subCatData.id }
            })
          : submitNewSubCat({
              projectNormalisedName: activeProject.normalisedName,
              payload
            })
      )
        .unwrap()
        .then(() => {
          logOllyEvent({
            event: 'O11ySettingsPageInteracted',
            data: {
              project_name: activeProject.name,
              project_id: activeProject.id,
              interaction:
                modalData?.action === 'edit'
                  ? 'failure_subcategory_edited'
                  : 'failure_subcategory_created'
            }
          });
          const descText = modalData?.action === 'edit' ? 'updated' : 'created';
          o11yNotify({
            title: `Successfully ${descText}!`,
            description: `Category was ${descText} successfully`,
            type: 'success'
          });
          handleCloseModal();
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wrong!',
            description: `There was an error while ${
              modalData.action === 'edit'
                ? 'updating category'
                : 'creating new category'
            }`,
            type: 'error'
          });
        })
        .finally(() => {
          setIsSubmittingData(false);
        });
    }
  };
  return (
    <O11yModal show size="md" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading={
          modalData?.action === 'edit'
            ? 'Edit failure category'
            : 'Create failure category'
        }
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <O11ySelectMenu
          onChange={handleSelectFailureCategory}
          value={selectedCategoryType}
          disabled={modalData?.action === 'edit'}
        >
          <O11ySelectMenuLabel>
            <p className="flex gap-1 text-sm font-medium leading-5">
              <span>Failure category</span>
              <span className="text-danger-600">*</span>
            </p>
          </O11ySelectMenuLabel>
          <O11ySelectMenuTrigger placeholder="Select.." value="" />
          <O11ySelectMenuOptionGroup>
            {Object.keys(FAILURE_CATEGORIES_TYPES).map((key) => (
              <O11ySelectMenuOptionItem
                checkPosition="right"
                key={key}
                wrapperClassName="text-sm"
                option={{
                  label: FAILURE_CATEGORIES_INFO[key].label,
                  value: key
                }}
              />
            ))}
          </O11ySelectMenuOptionGroup>
        </O11ySelectMenu>
        <div className="mt-4">
          <O11yInputField
            label="Category Name"
            id="category-name-value"
            isMandatory
            placeholder="Custom category"
            value={subCategoryName}
            onChange={handleChangeSubCategoryName}
          />
          <p className="text-base-500 mt-2 text-sm font-normal leading-5">
            Max-characters - 32
          </p>
        </div>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!isFormValid}
          loading={isSubmittingData}
          isIconOnlyButton={isSubmittingData}
          onClick={handleSubmitChanges}
          type="submit"
        >
          {modalData?.action === 'edit' ? 'Save Changes' : 'Create'}
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default AddEditSubCategoryModal;
