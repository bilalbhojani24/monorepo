/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useContext, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  MdFolderOpen
} from '@browserstack/bifrost';
import { O11yHyperlink } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  singleItemPropType,
  TESTLIST_TYPES
} from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName,
  transformUnsupportedTags
} from 'utils/common';

import RenderTestListItems from './RenderTestListItems';

const RenderRootItem = ({ data }) => {
  const { details, displayName, status, rank } = data;
  const {
    expandAll,
    closedAccordionIds,
    setClosedAccordionIds,
    o11yTestListingInteraction
  } = useContext(TestListContext);

  const isOpen = useMemo(() => {
    if (
      data.type === TESTLIST_TYPES.ROOT &&
      closedAccordionIds[data?.id]?.status === undefined
    ) {
      return expandAll;
    }
    return closedAccordionIds[data?.id]?.status === undefined
      ? true
      : closedAccordionIds[data?.id]?.status;
  }, [closedAccordionIds, expandAll, data?.id, data.type]);

  const toggleAccordion = () => {
    if (isOpen) {
      o11yTestListingInteraction('collapse_item');
      setClosedAccordionIds((prev) => ({
        ...prev,
        [data.id]: {
          status: false,
          type: data.type
        }
      }));
    } else {
      o11yTestListingInteraction('expand_item');
      setClosedAccordionIds((prev) => ({
        ...prev,
        [data.id]: {
          status: true,
          type: data.type
        }
      }));
    }
  };

  const childrenElements = useMemo(() => {
    const testRuns = [];
    const testListItems = [];
    data?.children.forEach((item) => {
      if (
        item.type === TESTLIST_TYPES.DESCRIBE ||
        item.type === TESTLIST_TYPES.ROOT
      ) {
        testRuns.push(item);
      } else {
        testListItems.push(item);
      }
    });
    return {
      testListItems,
      testRuns
    };
  }, [data.children]);

  return (
    <>
      <Accordion>
        <div
          className="bg-base-50 border-base-100 border-y px-6"
          style={{
            paddingLeft: HIERARCHY_SPACING_START + HIERARCHY_SPACING * rank
          }}
        >
          <AccordionInteractiveHeader
            controller={isOpen}
            onClick={toggleAccordion}
            wrapperClassName="px-0 py-2"
            asideContent={
              <div className="flex h-full gap-4">
                <div className="flex w-full justify-end gap-3">
                  {!!details?.browser && (
                    <DetailIcon
                      icon={getIconName(
                        details?.browser?.name,
                        details?.browser?.device?.name
                      )}
                      text={
                        details?.browser?.device?.name
                          ? details?.browser?.device?.name
                          : `${capitalize(details?.browser?.name)} ${
                              details?.browser?.version
                            }`
                      }
                      size="large"
                    />
                  )}
                  {!!details?.os && (
                    <DetailIcon
                      icon={`icon-${getOsIconName(details?.os?.name)}`}
                      text={
                        details?.os?.name
                          ? `${getShortOSName(details?.os?.name)} ${
                              details?.os?.version
                            }`
                          : ''
                      }
                      size="large"
                    />
                  )}
                </div>
                <div className="flex min-w-[250px] justify-end">
                  {status && <StatusBadges statusStats={status} />}
                </div>
              </div>
            }
            title={
              <div className="flex flex-col px-3">
                <p className="text-base-900 break-words text-left text-sm font-normal">
                  {ReactHtmlParser(displayName, {
                    transform: transformUnsupportedTags
                  })}
                </p>
                <div className="flex">
                  {details?.vcFileUrl && (
                    <PropagationBlocker>
                      <O11yHyperlink
                        target="_blank"
                        href={details?.vcFileUrl}
                        wrapperClassName="font-normal text-sm text-base-500 hover:text-brand-500"
                      >
                        <MdFolderOpen className="mr-1" />
                        <span
                          dir="rtl"
                          className="max-w-[200px] truncate text-sm font-normal"
                        >
                          {details?.filePath}
                        </span>
                      </O11yHyperlink>
                    </PropagationBlocker>
                  )}
                  {!!details?.middleScopes && (
                    <p className="text-base-500 flex items-center text-sm font-normal">
                      <span className="bg-base-400 mx-2 block h-1 w-1 rounded-full" />
                      <span dir="rtl" className="max-w-[300px] truncate">
                        {details?.middleScopes?.join(' / ')}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            }
          />
        </div>
        <AccordionPanel wrapperClassName="bg-white pl-0" controller={isOpen}>
          {!!childrenElements?.testListItems.length && (
            <RenderTestListItems data={childrenElements.testListItems} />
          )}
          {childrenElements?.testRuns?.map((item) => (
            <RenderRootItem data={item} key={item.id} />
          ))}
        </AccordionPanel>
      </Accordion>
    </>
  );
};

RenderRootItem.propTypes = {
  data: PropTypes.shape(singleItemPropType).isRequired
};

export default React.memo(RenderRootItem);
