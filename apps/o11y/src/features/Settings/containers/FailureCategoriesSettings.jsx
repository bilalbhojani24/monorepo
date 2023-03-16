import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAdd } from '@browserstack/bifrost';
import createSubCatSvg from 'assets/illustrations/create_subcat.svg';
import {
  O11yButton,
  O11yTable,
  O11yTableBody,
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';

import CategoryGroup from '../components/CategoryGroup';
import Initiator from '../components/Initiator';
import SettingsCard from '../components/SettingsCard';
import { FAILURE_CATEGORIES_TYPES } from '../constants';
import { getFailureSubCategories } from '../slices/failureCategoriesSettings';
import { getFailureSubCategoriesState } from '../slices/selectors';

export default function FailureCategoriesSettings() {
  const data = useSelector(getFailureSubCategoriesState);
  const activeProject = useSelector(getActiveProject);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeProject.normalisedName) {
      dispatch(
        getFailureSubCategories({
          projectNormalisedName: activeProject.normalisedName
        })
      );
    }
  }, [activeProject.normalisedName, dispatch]);

  const handleClickAddSubCategory = () => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.add_edit_sub_category
      })
    );
  };

  if (data?.isLoading) {
    return (
      <SettingsCard>
        <div className="m-auto flex h-72 w-72 flex-col items-center justify-center p-6">
          <O11yLoader
            wrapperClassName="flex-1"
            loaderClass="text-base-200 fill-base-400 w-8 h-8"
            text="Fetching categories"
            textClass="text-sm"
          />
        </div>
      </SettingsCard>
    );
  }
  if (!data?.isLoading && isEmpty(data?.data)) {
    return (
      <SettingsCard>
        <div className="p-6">
          <Initiator
            btnText="Create sub-category"
            desc="Failure categories help group issues that result from similar mode of test failures."
            onClick={handleClickAddSubCategory}
            title="Configure failure categories"
            illustration={createSubCatSvg}
          />
        </div>
      </SettingsCard>
    );
  }

  return (
    <SettingsCard>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium leading-6">
              Failure Categories
            </h2>
          </div>
          <O11yButton
            icon={<MdOutlineAdd className="text-lg" />}
            onClick={handleClickAddSubCategory}
          >
            Create sub-category
          </O11yButton>
        </div>
        <div className="mt-6">
          <O11yTable containerWrapperClass="overflow-visible overflow-x-visible">
            <O11yTableHead wrapperClassName="bg-white sticky top-0">
              <O11yTableRow>
                <O11yTableCell
                  variant="header"
                  wrapperClassName="md:rounded-lg "
                >
                  Category
                </O11yTableCell>
              </O11yTableRow>
            </O11yTableHead>
            <O11yTableBody>
              {Object.values(FAILURE_CATEGORIES_TYPES).map((key) => (
                <CategoryGroup key={key} type={key} />
              ))}
            </O11yTableBody>
          </O11yTable>
        </div>
      </div>
    </SettingsCard>
  );
}
