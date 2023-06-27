import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdOpenInNew,
  TooltipBody,
  TooltipFooter,
  TooltipHeader
} from '@browserstack/bifrost';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { getDocUrl } from 'utils/common';
import { getPageUrl } from 'utils/routeUtils';

function GenericTooltipContent({ data, logCb }) {
  const dispatch = useDispatch();
  const internalUrl = useMemo(() => {
    if (data?.isInternalLink && data?.ctaUrl) {
      return dispatch(getPageUrl(data.ctaUrl));
    }
    return '';
  }, [data.ctaUrl, data?.isInternalLink, dispatch]);

  const docUrl = useMemo(() => {
    if (data?.isDocUrl && data?.ctaUrl) {
      return getDocUrl({ path: data?.ctaUrl });
    }
    return '';
  }, [data?.ctaUrl, data?.isDocUrl]);

  return (
    <>
      <TooltipHeader>{data.title}</TooltipHeader>
      <TooltipBody>{data?.tooltipText}</TooltipBody>
      {!!data?.cta && (
        <TooltipFooter>
          {data?.isInternalLink ? (
            <Link
              to={internalUrl || data?.ctaUrl}
              onClick={() => logCb(data?.trackingData)}
            >
              <O11yButton>{data.cta}</O11yButton>
            </Link>
          ) : (
            <O11yHyperlink
              onClick={() => logCb(data?.trackingData)}
              target="_blank"
              href={docUrl || data?.ctaUrl}
            >
              <O11yButton
                icon={<MdOpenInNew className="text-xl" />}
                iconPlacement="end"
                wrapperClassName="bg-base-600 hover:bg-base-700 rounded py-1.5 px-3 text-white"
              >
                {data.cta}
              </O11yButton>
            </O11yHyperlink>
          )}
        </TooltipFooter>
      )}
    </>
  );
}

GenericTooltipContent.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  logCb: PropTypes.func
};

GenericTooltipContent.defaultProps = {
  logCb: () => {}
};

export default GenericTooltipContent;
