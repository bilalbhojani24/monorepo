import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineOpenInNew } from '@browserstack/bifrost';
import { O11yHyperlink } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import PrismHighlight from 'common/PrismHighlight';
import isEmpty from 'lodash/isEmpty';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getTestCodeData } from '../slices/dataSlice';
import { getCurrentTestRunId } from '../slices/selectors';

export default function TestCode() {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const [isLoading, setIsLoading] = useState(true);
  const [testCode, setTestCode] = useState({});

  useEffect(() => {
    handleLogTDInteractionEvent({ interaction: 'info_test_code_viewed' });
  }, [handleLogTDInteractionEvent]);

  useEffect(() => {
    mounted.current = true;
    if (currentTestRunId) {
      setIsLoading(true);
      dispatch(getTestCodeData({ testRunId: currentTestRunId }))
        .unwrap()
        .then((data) => {
          if (mounted.current) {
            setTestCode(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (mounted.current) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, currentTestRunId]);

  if (isLoading) {
    return <O11yLoader wrapperClassName="py-6" />;
  }
  if (!isLoading && isEmpty(testCode)) {
    return (
      <div className="h-full w-full">
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <section className="bg-base-50 rounded-md p-6">
      {testCode?.filename && (
        <div className="">
          {testCode?.url ? (
            <>
              <O11yHyperlink
                href={testCode?.url}
                target="_blank"
                wrapperClassName="flex items-center gap-2"
              >
                <p className="text-base-900 text-sm font-medium leading-5">
                  {testCode.filename}
                </p>
                <MdOutlineOpenInNew className="text-base-500 h-4 w-4" />
              </O11yHyperlink>
            </>
          ) : (
            <p className="text-base-900 text-sm font-medium leading-5">
              {testCode.filename}
            </p>
          )}
        </div>
      )}
      <div className="">
        <PrismHighlight
          code={testCode?.code}
          language={testCode?.language}
          shouldWrapText
        />
      </div>
    </section>
  );
}
