import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowDown } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import { setCurrentTestRunId } from '../slices/uiSlice';
import { getStatusColors } from '../utils';

const TestRetriesMenu = () => {
  const dispatch = useDispatch();

  const testMeta = useSelector(getTestMeta);
  const testRunId = useSelector(getShowTestDetailsFor);
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();

  const retriesMenuOptions = useMemo(() => {
    const retries = testMeta?.data?.retries;
    if (retries && retries?.length > 0) {
      return retries.map((retryOption, idx) => ({
        label: (
          <div className="mr-4 flex items-center gap-1 space-x-2">
            <div
              className={twClassNames(
                'h-2 w-2 rounded-full',
                getStatusColors(retryOption?.status)
              )}
            />
            <span className="text-sm leading-5">
              {idx === 0 ? 'First Run' : `Re-run ${idx}`}
            </span>
          </div>
        ),
        value: retryOption.uuid,
        id: retryOption.id
      }));
    }
    return [];
  }, [testMeta?.data?.retries]);

  const defaultSelectedOption = useMemo(() => {
    const retries = testMeta?.data?.retries;
    if (retries && retries.length > 0) {
      const selectedIndex = retries.findIndex(
        (retryOption) => retryOption.id.toString() === testRunId.toString()
      );
      if (selectedIndex !== -1) {
        return retriesMenuOptions[selectedIndex];
      }
    }
    return null;
  }, [testMeta?.data?.retries, testRunId, retriesMenuOptions]);

  const onRetryRunChange = (selected) => {
    dispatch(setCurrentTestRunId(selected.id));
    handleLogTDInteractionEvent({ interaction: 'rerun_tab_clicked' });
  };

  return (
    <div>
      {defaultSelectedOption && (
        <O11ySelectMenu
          defaultValue={defaultSelectedOption}
          onChange={onRetryRunChange}
        >
          <O11ySelectMenuTrigger
            placeholder="Select.."
            triggerIcon={<MdKeyboardArrowDown className="h-4 w-4" />}
          />
          <O11ySelectMenuOptionGroup alignment="end">
            {retriesMenuOptions.map((retryOption) => (
              <O11ySelectMenuOptionItem
                key={retryOption.id}
                option={retryOption}
                checkPosition="right"
              />
            ))}
          </O11ySelectMenuOptionGroup>
        </O11ySelectMenu>
      )}
    </div>
  );
};

export default TestRetriesMenu;
