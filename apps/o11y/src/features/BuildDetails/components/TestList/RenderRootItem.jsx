import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { MdFolderOpen } from '@browserstack/bifrost';
import { O11yAccordion, O11yHyperlink } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import StatusBadges from 'common/StatusBadges';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  singleItemPropType
} from 'features/BuildDetails/constants';
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
    <O11yAccordion
      panelContentNode={
        <div
          style={{
            paddingLeft: HIERARCHY_SPACING * rank + HIERARCHY_SPACING_START
          }}
        >
          <RenderChildrens listOfItems={item} />
        </div>
      }
      openByDefault
      triggerClassName="px-8 py-3 bg-base-50"
      triggerContentNode={
        <div className="flex w-full items-center px-3">
          <div className="w-7/12">
            <p className="text-base-900 text-sm">
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
                <p className="text-base-500 flex items-center text-sm">
                  <span className="bg-base-400 mx-2 block h-1 w-1 rounded-full" />
                  {details?.middleScopes?.join(' / ')}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex gap-3">
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
            </div>
          </div>
          <div>{status && <StatusBadges statusStats={status} />}</div>
        </div>
      }
    />
  );
};

RenderRootItem.propTypes = {
  item: PropTypes.shape(singleItemPropType).isRequired
};

export default RenderRootItem;
