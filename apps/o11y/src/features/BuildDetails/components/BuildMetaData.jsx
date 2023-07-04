import React from 'react';
import { useSelector } from 'react-redux';
import {
  Hyperlink,
  MdAutoAwesome,
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdOutlineTimer,
  MdPerson,
  MdRemoveCircle,
  MdSchedule
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yMetaData, O11yTooltip } from 'common/bifrostProxy';
import CiIcon from 'common/CiIcon';
import O11yLoader from 'common/O11yLoader';
import VCIcon from 'common/VCIcon';
import ViewMetaPopOver from 'common/ViewMetaPopOver';
import { TEST_STATUS } from 'constants/common';
import PropTypes from 'prop-types';
import { getBuildMarkedStatus } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import { getBuildMeta } from '../slices/selectors';

function BuildMetaData({ logMetaInteractionEvent, wrapperClassName }) {
  const buildMeta = useSelector(getBuildMeta);

  const { user, startedAt, versionControlInfo, ciBuildData, duration } =
    buildMeta.data;
  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(
      buildMeta.data.status,
      buildMeta.data.statusStats
    );
    if (
      status !== TEST_STATUS.PENDING &&
      buildMeta.data.isAutoAnalyzerRunning
    ) {
      return (
        <O11yMetaData
          icon={<MdAutoAwesome className="text-brand-800 h-4 w-4" />}
          metaDescription="Analysing"
          textColorClass="text-brand-800"
        />
      );
    }
    switch (status) {
      case TEST_STATUS.PENDING:
        return (
          <O11yMetaData
            icon={<O11yLoader loaderClass="h-4 w-4" />}
            metaDescription="Running"
            textColorClass="text-base-600"
          />
        );
      case TEST_STATUS.FAIL:
        return (
          <O11yMetaData
            icon={<MdCancel className="h-5 w-5" />}
            metaDescription="Failed"
            textColorClass="text-danger-600"
          />
        );
      case TEST_STATUS.PASS:
        return (
          <O11yMetaData
            icon={<MdCheckCircle className="h-5 w-5" />}
            metaDescription="Passed"
            textColorClass="text-success-600"
          />
        );

      case TEST_STATUS.SKIPPED:
        return (
          <O11yMetaData
            icon={<MdRemoveCircle className="h-5 w-5" />}
            metaDescription="Skipped"
            textColorClass="text-base-500"
          />
        );
      case TEST_STATUS.UNKNOWN:
      default:
        return (
          <O11yMetaData
            icon={<MdHelp className="h-5 w-5" />}
            metaDescription="Unknown"
            textColorClass="text-attention-500"
          />
        );
    }
  };
  return (
    <div
      className={twClassNames(
        'flex flex-wrap items-center gap-4',
        wrapperClassName
      )}
    >
      {renderStatusIcon()}
      <O11yMetaData
        icon={<MdPerson className="h-5 w-5" />}
        metaDescription={user}
        textColorClass="text-base-500"
        metaTitle="Run by"
      />
      {startedAt && (
        <O11yMetaData
          icon={<MdSchedule className="h-5 w-5" />}
          metaDescription={getCustomTimeStamp({
            dateString: new Date(startedAt),
            hideSeconds: true
          })}
          textColorClass="text-base-500"
          metaTitle="Started at"
        />
      )}
      {duration && (
        <O11yMetaData
          icon={<MdOutlineTimer className="h-5 w-5" />}
          metaDescription={milliSecondsToTime(duration)}
          textColorClass="text-base-500"
          metaTitle="Duration"
        />
      )}
      {versionControlInfo?.commitId && (
        <Hyperlink
          href={versionControlInfo?.url}
          target="_blank"
          onClick={() => logMetaInteractionEvent('commit_sha_clicked')}
        >
          <O11yMetaData
            icon={
              <VCIcon
                url={versionControlInfo?.url}
                iconProps={{ className: 'h-5 w-5' }}
              />
            }
            metaDescription={versionControlInfo.commitId.slice(0, 8)}
            textColorClass="text-base-500 hover:text-brand-700 screen:[&>span]:hidden screen:2xl:[&>span]:block"
            metaTitle={`Commit id ${versionControlInfo.commitId.slice(0, 8)}`}
          />
        </Hyperlink>
      )}
      {ciBuildData?.buildNumber && (
        <O11yTooltip
          theme="dark"
          placementSide="bottom"
          wrapperClassName="py-2"
          content={
            <>
              {ciBuildData?.jobName ? (
                <div className="mx-4">
                  <p className="text-base-300 text-sm">
                    CI Job name: {ciBuildData.jobName}
                  </p>
                </div>
              ) : null}
            </>
          }
        >
          <Hyperlink
            href={ciBuildData?.buildUrl}
            target="_blank"
            onClick={() => logMetaInteractionEvent('ci_url_clicked')}
          >
            <O11yMetaData
              icon={
                <CiIcon
                  name={ciBuildData?.name}
                  iconProps={{ className: 'h-5 w-5' }}
                />
              }
              metaDescription={`${ciBuildData.name} ${ciBuildData?.buildNumber}`}
              textColorClass="text-base-500 hover:text-brand-700 screen:[&>span]:hidden screen:2xl:[&>span]:block"
            />
          </Hyperlink>
        </O11yTooltip>
      )}
      <ViewMetaPopOver
        data={buildMeta.data || {}}
        handleInteraction={({ interaction }) =>
          logMetaInteractionEvent(interaction)
        }
      />
    </div>
  );
}

BuildMetaData.propTypes = {
  logMetaInteractionEvent: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};

BuildMetaData.defaultProps = {
  wrapperClassName: ''
};

export default BuildMetaData;
