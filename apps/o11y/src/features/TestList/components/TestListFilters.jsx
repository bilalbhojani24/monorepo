import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yComboBox,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader,
  O11ySwitch
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { API_STATUSES } from 'constants/common';
import {
  getSelectedFilters,
  getStaticFilters
} from 'features/TestList/slices/selectors';
import {
  cancelSelectedFilters,
  setAppliedFilters,
  setSelectedFilters
} from 'features/TestList/slices/testListSlice';

import { constructTreeData } from '../utils';

import { FolderFilter } from './FolderFilter';

const TestListFilters = () => {
  const dispatch = useDispatch();
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);
  const staticFilters = useSelector(getStaticFilters);
  const { issueType, folder, os, flaky, browser, history, tags, status } =
    staticFilters?.data;
  const selectedFilters = useSelector(getSelectedFilters);

  const { treeData, selectedNodes } = useMemo(
    () => constructTreeData(folder, selectedFilters.folder),
    [folder, selectedFilters.folder]
  );

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };

  const onCancelSelectedFilters = () => {
    dispatch(cancelSelectedFilters());
    hideSlideover();
  };
  const onApplyFilterClick = () => {
    dispatch(
      setAppliedFilters({
        ...selectedFilters
      })
    );
    hideSlideover();
  };

  const onChangeArrayFilter = (selectedValues, targetFilterName) => {
    dispatch(
      setSelectedFilters({
        [targetFilterName]: selectedValues?.map((el) => el.value)
      })
    );
  };

  const onChangeDDFilter = (selectedValues, targetFilterName) => {
    dispatch(
      setSelectedFilters({
        [targetFilterName]: [selectedValues.value]
      })
    );
  };

  const handleMuteFilterChage = (selectedValue) => {
    dispatch(
      setSelectedFilters({
        isMuted: selectedValue
      })
    );
  };

  return (
    <>
      <O11ySlideover
        size="sm"
        show={isSlideoverVisible}
        backgroundOverlay={false}
        onEscPress={onCancelSelectedFilters}
      >
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={onCancelSelectedFilters}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          {staticFilters?.apiState?.status === API_STATUSES.FULFILLED && (
            <div className="flex flex-col gap-6 px-4">
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="OS"
                options={os}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'os');
                }}
                value={os.filter((el) =>
                  selectedFilters?.os?.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="Browser"
                options={browser}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'browser');
                }}
                value={browser.filter((el) =>
                  selectedFilters?.browser?.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="Tags"
                options={tags}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'tags');
                }}
                value={tags?.filter((el) =>
                  selectedFilters?.tags?.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <FolderFilter
                listTreeCheckboxData={treeData}
                onChange={(selectedValues) => {
                  dispatch(
                    setSelectedFilters({
                      folder: selectedValues
                    })
                  );
                }}
                prevSelectedValues={selectedNodes}
              />
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="Status"
                options={status}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'status');
                }}
                value={status.filter((el) =>
                  selectedFilters?.status?.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <O11yComboBox
                placeholder="Select"
                label="Flaky"
                options={flaky}
                onChange={(selectedValues) => {
                  onChangeDDFilter(selectedValues, 'flaky');
                }}
                value={
                  flaky.filter((el) =>
                    selectedFilters?.flaky?.includes(el.value)
                  )[0]
                }
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="Defects"
                options={issueType}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'issueType');
                }}
                value={issueType.filter((el) =>
                  selectedFilters?.issueType?.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <O11yComboBox
                placeholder="Select"
                label="History"
                options={history}
                onChange={(selectedValues) => {
                  onChangeDDFilter(selectedValues, 'history');
                }}
                value={
                  history.filter((el) =>
                    selectedFilters?.history?.includes(el.value)
                  )[0]
                }
                checkPosition="right"
                virtuosoWidth="350px"
                optionsListWrapperClassName="min-w-max overflow-hidden"
              />
              <div>
                <span className="text-base-700 mb-1 block text-sm font-medium">
                  Muted
                </span>
                <O11ySwitch
                  checked={selectedFilters?.isMuted}
                  onChange={handleMuteFilterChage}
                />
              </div>
            </div>
          )}
          {staticFilters?.apiState?.status === API_STATUSES.PENDING && (
            <O11yLoader />
          )}
          {staticFilters?.apiState?.status === API_STATUSES.FAILED && (
            <p className="text-base-500 text-sm">Something went wrong</p>
          )}
        </O11ySlideoverBody>

        <O11ySlideoverFooter isBorder="true" position="right">
          <O11yButton
            variant="primary"
            colors="white"
            onClick={onCancelSelectedFilters}
          >
            Cancel
          </O11yButton>
          <O11yButton onClick={onApplyFilterClick}>Apply</O11yButton>
        </O11ySlideoverFooter>
      </O11ySlideover>
      <O11yButton
        variant="primary"
        colors="white"
        wrapperClassName="rounded"
        size="default"
        icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
        onClick={showSlideover}
      >
        Filters
      </O11yButton>
    </>
  );
};

export default TestListFilters;
