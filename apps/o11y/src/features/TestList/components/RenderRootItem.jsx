import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  MdFolderOpen
} from '@browserstack/bifrost';
import { O11yHyperlink } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import StatusBadges from 'common/StatusBadges';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  singleItemPropType
} from 'features/TestList/constants';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName,
  transformUnsupportedTags
} from 'utils/common';

import RenderChildrens from './RenderTestChildrens';

const RenderRootItem = ({ item }) => {
  const { details, displayName, status, rank } = item;
  return (
    <>
      <Accordion openByDefault>
        <div
          className="bg-base-50 border-base-100 border-y px-6"
          style={{
            paddingLeft: HIERARCHY_SPACING_START + HIERARCHY_SPACING * rank
          }}
        >
          <AccordionInteractiveHeader
            wrapperClassName="px-0"
            asideContent={
              <div className="flex h-full">
                {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
                <div className="flex w-full min-w-[250px] gap-3">
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
                <div className="flex h-full">
                  {status && <StatusBadges statusStats={status} />}
                </div>
              </div>
            }
            title={
              <div className="flex w-full items-center px-3">
                <div>
                  <p className="text-base-900 text-left text-sm">
                    {ReactHtmlParser(displayName, {
                      transform: transformUnsupportedTags
                    })}
                  </p>
                  <div className="flex">
                    {details?.vcFileUrl && (
                      <p className="text-base-500 flex items-center text-sm">
                        <O11yHyperlink
                          target="_blank"
                          href={details?.vcFileUrl}
                          wrapperClassName="text-base-500 font-normal text-sm overflow-hidden w-full"
                        >
                          <MdFolderOpen className="mr-1" />
                          <span className="text-base-500 max-w-xs text-sm font-normal">
                            {details?.filePath.length > 20
                              ? `...${details?.filePath.slice(
                                  details?.filePath.length - 20,
                                  details?.filePath.length
                                )}`
                              : details?.filePath}
                          </span>
                        </O11yHyperlink>
                      </p>
                    )}
                    {!!details?.middleScopes && (
                      <p className="text-base-500 flex items-center text-sm font-normal">
                        <span className="bg-base-400 mx-2 block h-1 w-1 rounded-full" />
                        {details?.middleScopes?.join(' / ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </div>
        <AccordionPanel wrapperClassName="bg-white pl-0">
          <RenderChildrens listOfItems={item} />
        </AccordionPanel>
      </Accordion>
    </>
  );
};

RenderRootItem.propTypes = {
  item: PropTypes.shape(singleItemPropType).isRequired
};

export default RenderRootItem;
