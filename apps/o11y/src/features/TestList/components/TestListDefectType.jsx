import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdExpandMore, TooltipBody } from '@browserstack/bifrost';
import { changeIssueType } from 'api/testlist';
import {
  O11yButton,
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger,
  O11yTooltip
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import { TEST_STATUS } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import { singleItemPropType } from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { o11yNotify } from 'utils/notification';

const BULK_EDIT = 'BULK_EDIT';

function TestListDefectType({ data }) {
  const dispatch = useDispatch();
  const { data: buildMeta } = useSelector(getBuildMeta);
  const [isUpdating, setIsUpdating] = useState(false);
  const activeProject = useSelector(getActiveProject);
  const {
    testDefectTypeMapping,
    updateTestDefectTypeMapping,
    o11yTestListingInteraction
  } = useContext(TestListContext);

  const [issueType, setIssueType] = useState(
    () =>
      testDefectTypeMapping[data?.details?.id]?.issueType ||
      data?.details?.issueType ||
      {}
  );
  const [isAutoAnalyzed, setIsAutoAnalyzed] = useState(() =>
    testDefectTypeMapping[data?.details?.id]?.issueType
      ? false
      : data?.details?.isAutoAnalyzed || false
  );
  const availableIssueTypes = buildMeta?.issueTypes;
  const menuOptions = useMemo(
    () =>
      availableIssueTypes
        ? availableIssueTypes?.map((item) => ({
            label: item.name,
            value: item.id
          }))
        : [],
    [availableIssueTypes]
  );
  const handleIssueTypeChange = async (selectedItem) => {
    const item = {
      value: selectedItem.id,
      label: selectedItem.body
    };
    if (item.value === BULK_EDIT) {
      o11yTestListingInteraction('analyzer_bulk_tagging_invoked');
      dispatch(
        toggleModal({
          version: MODAL_TYPES.bulk_assign_issuetype,
          data: {
            buildId: buildMeta?.uuid,
            testRunId: data?.details?.id,
            defaultTypeSelection: selectedItem.defaultSelection,
            selectedTestItemData: data,
            analyticsData: {
              source: 'test_listing'
            },
            onSuccess: (updatedData) => {
              updateTestDefectTypeMapping(updatedData, true);
            }
          }
        })
      );
    } else if (item.value !== issueType.id) {
      const currentIssueType = { ...issueType };
      const isCurrentlyAutoAnalyzed = isAutoAnalyzed;
      setIsUpdating(true);
      setIsAutoAnalyzed(false);
      try {
        setIssueType({ name: item.label, id: item.value });
        const apiPayload = {
          issues: [
            {
              testRunId: data?.details?.id,
              issueTypeId: item.value
            }
          ]
        };
        await changeIssueType(activeProject.id, apiPayload);
        updateTestDefectTypeMapping({
          id: data?.details?.id,
          issueType: { name: item.label, id: item.value }
        });
        setIsUpdating(false);
        o11yNotify({
          type: 'success',
          title: 'Updated issue type successfully',
          description: ''
        });
        o11yTestListingInteraction('analyzer_issue_updated');
      } catch (err) {
        setIssueType(currentIssueType);
        setIsAutoAnalyzed(isCurrentlyAutoAnalyzed);
        setIsUpdating(false);
      }
    }
  };

  useEffect(() => {
    if (
      testDefectTypeMapping[data?.details?.id]?.issueType &&
      testDefectTypeMapping[data?.details?.id]?.issueType?.id !== issueType.id
    ) {
      setIssueType(testDefectTypeMapping[data?.details?.id]?.issueType);
    }
  }, [data?.details?.id, issueType.id, testDefectTypeMapping]);

  const tooltipData = useMemo(() => {
    if (buildMeta?.isArchived) {
      return {
        title: 'Options not applicable',
        desc: 'Failure category options not applicable for archived build run.'
      };
    }
    if (buildMeta?.isAutoAnalyzerRunning) {
      return {
        title: 'Analyser is running!',
        desc: 'Failure category options will be available after build finish and analysis completion.'
      };
    }
    return {
      title: '',
      desc: ''
    };
  }, [buildMeta?.isArchived, buildMeta?.isAutoAnalyzerRunning]);

  if (!issueType?.name || data?.details?.status !== TEST_STATUS.FAIL) {
    return null;
  }

  return (
    <PropagationBlocker className="mb-2 flex ">
      {buildMeta?.isAutoAnalyzerRunning || buildMeta?.isArchived ? (
        <O11yTooltip
          placement="top"
          trigger={['hover']}
          content={
            <TooltipBody>
              <p className="mb-2 text-sm font-medium text-white">
                {tooltipData.title}
              </p>
              <p className="text-base-300 text-sm">{tooltipData.desc}</p>
            </TooltipBody>
          }
          theme="dark"
        >
          <O11yButton
            icon={<MdExpandMore className="text-base" />}
            colors="white"
            size="extra-small"
            iconPlacement="end"
            disabled
          >
            {issueType?.name}
          </O11yButton>
        </O11yTooltip>
      ) : (
        <O11yDropdown onClick={(value) => handleIssueTypeChange(value)}>
          <O11yDropdownTrigger wrapperClassName="flex items-center justify-between p-0 hover:bg-transparent border-0 shadow-none w-full">
            <O11yButton
              icon={<MdExpandMore className="text-base" />}
              colors="white"
              size="extra-small"
              iconPlacement="end"
            >
              {issueType?.name}
            </O11yButton>
          </O11yDropdownTrigger>

          <O11yDropdownOptionGroup wrapperClassName="w-full">
            {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
            <div className="h-[10.25rem] overflow-y-auto">
              {menuOptions?.map((singleMenu) => (
                <O11yDropdownOptionItem
                  key={singleMenu.value}
                  option={{ body: singleMenu.label, id: singleMenu.value }}
                />
              ))}
            </div>
            <O11yDropdownOptionItem
              option={{
                body: 'Bulk update failure category',
                id: BULK_EDIT,
                defaultSelection: { name: issueType.name, id: issueType.id }
              }}
              wrapperClassName="border-t border-base-100"
            />
          </O11yDropdownOptionGroup>
        </O11yDropdown>
      )}
      {isUpdating && (
        <O11yLoader wrapperClassName="w-5 px-4" loaderClass="h-4 w-4" />
      )}
    </PropagationBlocker>
  );
}

export default TestListDefectType;

TestListDefectType.propTypes = {
  data: PropTypes.shape(singleItemPropType).isRequired
};
TestListDefectType.defaultProps = {};
