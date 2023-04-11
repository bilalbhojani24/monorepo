import React, { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdCheck,
  MdOutlineContentCopy,
  MdOutlineOpenInNew
} from '@browserstack/bifrost';
import { O11yHyperlink, O11yTruncateText } from 'common/bifrostProxy';
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
  const [isCopied, setIsCopied] = useState(false);

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

  const handleClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      if (mounted.current) {
        setIsCopied(false);
      }
    }, 2000);
  };

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
        <div className="flex items-center justify-between gap-2">
          <div>
            {testCode?.url ? (
              <>
                <O11yHyperlink
                  href={testCode?.url}
                  target="_blank"
                  wrapperClassName="flex items-center gap-2"
                >
                  <O11yTruncateText
                    wrapperClassName="line-clamp-1"
                    tooltipContent={
                      <p className="break-words px-4 text-sm font-medium leading-5 text-white">
                        {testCode.filename}
                      </p>
                    }
                    hidetooltipTriggerIcon
                  >
                    <p className="text-base-900 text-sm font-medium leading-5">
                      {testCode.filename}
                    </p>
                    <MdOutlineOpenInNew className="text-base-500 h-4 w-4" />
                  </O11yTruncateText>
                </O11yHyperlink>
              </>
            ) : (
              <O11yTruncateText
                wrapperClassName="line-clamp-1"
                tooltipContent={
                  <p className="break-words px-4 text-sm font-medium leading-5 text-white">
                    {testCode.filename}
                  </p>
                }
                hidetooltipTriggerIcon
              >
                <p className="text-base-900 text-sm font-medium leading-5">
                  {testCode.filename}
                </p>
              </O11yTruncateText>
            )}
          </div>
          <div>
            <CopyToClipboard text={testCode?.code} onCopy={handleClick}>
              {isCopied ? (
                <MdCheck className="text-brand-500 h-4 w-4" />
              ) : (
                <MdOutlineContentCopy className="text-base-500 h-4 w-4" />
              )}
            </CopyToClipboard>
          </div>
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
