import React from 'react';
import {
  Hyperlink,
  MdInfoOutline,
  Tooltip,
  TooltipBody,
  TooltipFooter
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const ReportTooltip = ({ cardToolTipData }) => {
  const [showReportTooltip, setShowReportTooltip] = React.useState(false);

  return (
    <Tooltip
      show={showReportTooltip}
      theme="dark"
      placementSide="right"
      content={
        <>
          <TooltipBody wrapperClassName="text-white text-sm font-light">
            <div className="mb-4">{cardToolTipData.description}</div>

            <div className="">{cardToolTipData.recommend}</div>
          </TooltipBody>

          <TooltipFooter>
            <Hyperlink
              wrapperClassName="text-white underline font-normal mt-2"
              href={cardToolTipData.link}
              rel="noreferrer noopener"
            >
              Learn More
            </Hyperlink>
          </TooltipFooter>
        </>
      }
      onPointerDownOutside={() => {
        setShowReportTooltip(false);
      }}
    >
      <MdInfoOutline
        onClick={() => {
          setShowReportTooltip((prevVal) => !prevVal);
        }}
      />
    </Tooltip>
  );
};

ReportTooltip.propTypes = {
  cardToolTipData: PropTypes.shape(PropTypes.any).isRequired
};

export default ReportTooltip;
