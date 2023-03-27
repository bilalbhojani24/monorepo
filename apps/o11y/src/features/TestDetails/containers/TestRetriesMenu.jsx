import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import StatusIcon from 'common/StatusIcon';

import { getShowTestDetailsFor, getTestMeta } from '../slices/selectors';
import { setCurrentTestRunId } from '../slices/uiSlice';

const TestRetriesMenu = () => {
  const dispatch = useDispatch();

  const testMeta = useSelector(getTestMeta);
  const testRunId = useSelector(getShowTestDetailsFor);

  const retriesMenuOptions = useMemo(() => {
    const retries = testMeta?.data?.retries;
    if (retries && retries?.length > 0) {
      return retries.map((retryOption, idx) => ({
        label: (
          <div className="flex items-center gap-1 space-x-2">
            <StatusIcon status={retryOption.status} />
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
  };

  return (
    <div>
      {defaultSelectedOption && (
        <O11ySelectMenu
          defaultValue={defaultSelectedOption}
          onChange={onRetryRunChange}
        >
          <O11ySelectMenuTrigger placeholder="Select.." />
          <O11ySelectMenuOptionGroup>
            {retriesMenuOptions.map((retryOption) => (
              <O11ySelectMenuOptionItem
                key={retryOption.id}
                option={retryOption}
              />
            ))}
          </O11ySelectMenuOptionGroup>
        </O11ySelectMenu>
      )}
    </div>
  );
};

export default TestRetriesMenu;
