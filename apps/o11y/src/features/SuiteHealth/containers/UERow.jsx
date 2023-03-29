import React from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import StackTraceTooltip from 'common/StackTraceTooltip';
import PropTypes from 'prop-types';

import UEBreakdown from '../components/UEBreakdown';
import UERowHeader from '../components/UERowHeader';
import { UNIQUE_ERROR_MAIN_HEADER } from '../constants';

export default function UERow({ data }) {
  return (
    <>
      <Accordion>
        <AccordionInteractiveHeader
          title={
            <div
              className={twClassNames(
                UNIQUE_ERROR_MAIN_HEADER.error.bodyClass,
                'pl-1 pr-4 text-left'
              )}
            >
              <div className="flex-1 truncate">
                <O11yTooltip
                  triggerWrapperClassName="max-w-full truncate"
                  content={
                    <StackTraceTooltip
                      traceLines={data?.error || []}
                      copyText={data?.error?.join('\n')}
                    />
                  }
                  wrapperClassName="p-1 shadow-lg"
                  placementSide="bottom"
                  placementAlign="start"
                  size="lg"
                  arrowWidth={0}
                  arrowHeight={0}
                  sideOffset={2}
                >
                  <span className="text-base-900 text-sm font-medium leading-5">
                    {data?.error?.[0]}
                  </span>
                </O11yTooltip>
              </div>
            </div>
          }
          asideContent={
            <div className="flex h-full w-full cursor-pointer items-center rounded-b-md">
              <UERowHeader data={data} />
            </div>
          }
        />
        <AccordionPanel>
          <div className="overflow-hidden rounded-b-md">
            <UEBreakdown errorId={data.id} />
          </div>
        </AccordionPanel>
      </Accordion>
    </>
  );
}

UERow.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
