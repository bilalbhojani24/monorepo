import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { InformationCircleIcon } from '../Icon';
import ToolTip from '../Tooltip';
import { TooltipPropTypes } from '../Tooltip/components/TooltipContainer';

import Kpi from './components/Kpi';
import {
  DATA_VISUALIZATION_DESC_POSITION,
  DATA_VISUALIZATION_SIZES
} from './const/dataVisualizationConstants';

import './styles.scss';

const DataVisualization = ({
  size,
  title,
  desc,
  descPosition,
  analytics,
  footerProps,
  KpiProps,
  otherOptions,
  filterDropdown,
  headerInfo,
  headerInfoTooltipProps,
  wrapperClassName
}) => (
  <div
    className={classNames('rounded-lg shadow', {
      'w-[332px]': size === DATA_VISUALIZATION_SIZES[0],
      'w-[508px]': size === DATA_VISUALIZATION_SIZES[1],
      'w-[684px]': size === DATA_VISUALIZATION_SIZES[2],
      'w-[1388px]': size === DATA_VISUALIZATION_SIZES[3],
      wrapperClassName
    })}
  >
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="mr-2.5 text-lg font-medium leading-6">{title}</h3>
          {headerInfo && (
            <ToolTip
              arrowClassName={headerInfoTooltipProps?.arrowClassName}
              arrowWidth={headerInfoTooltipProps?.arrowWidth}
              arrowHeight={headerInfoTooltipProps?.arrowHeight}
              arrowPadding={headerInfoTooltipProps?.arrowPadding}
              alignOffset={headerInfoTooltipProps?.alignOffset}
              avoidCollisions={headerInfoTooltipProps?.avoidCollisions}
              content={headerInfoTooltipProps?.content}
              delay={headerInfoTooltipProps?.delay}
              defaultOpen={headerInfoTooltipProps?.defaultOpen}
              onEscapeKeyDown={headerInfoTooltipProps?.onEscapeKeyDown}
              onPointerDownOutside={
                headerInfoTooltipProps?.onPointerDownOutside
              }
              onOpenChange={headerInfoTooltipProps?.onOpenChange}
              sideOffset={headerInfoTooltipProps?.sideOffset}
              sticky={headerInfoTooltipProps?.sticky}
              show={headerInfoTooltipProps?.show}
              theme={headerInfoTooltipProps?.theme}
              placementAlign={headerInfoTooltipProps?.placementAlign}
              placementSide={headerInfoTooltipProps?.placementSide}
              size={headerInfoTooltipProps?.size}
            >
              {headerInfoTooltipProps?.children ? (
                headerInfoTooltipProps?.children
              ) : (
                <InformationCircleIcon
                  className="h-5 w-5 shrink-0 cursor-pointer"
                  aria-hidden="true"
                />
              )}
            </ToolTip>
          )}
        </div>

        <div className="flex items-center">
          <div className="mr-2">{filterDropdown}</div>
          {otherOptions}
        </div>
      </div>
      {descPosition === DATA_VISUALIZATION_DESC_POSITION[0] && (
        <p className="text-base-600 mt-4 font-normal leading-6">{desc}</p>
      )}
      {KpiProps?.length > 0 && (
        <div
          className={classNames('mt-4', {
            'grid grid-cols-1 gap-2': size === DATA_VISUALIZATION_SIZES[0],
            'grid grid-cols-3 gap-2': size === DATA_VISUALIZATION_SIZES[1],
            'grid grid-cols-5 gap-2':
              size === DATA_VISUALIZATION_SIZES[2] ||
              size === DATA_VISUALIZATION_SIZES[3],
            'align-items-center flex justify-between':
              size === DATA_VISUALIZATION_SIZES[4]
          })}
        >
          {KpiProps.map((propsObject) => (
            <Kpi
              key={propsObject.id}
              difference={propsObject?.difference}
              changeType={propsObject?.changeType}
              description={propsObject?.description}
              percentage={propsObject?.percentage}
              direction={propsObject?.direction}
              title={propsObject?.title}
            />
          ))}
        </div>
      )}
      <div>{analytics}</div>

      {descPosition === DATA_VISUALIZATION_DESC_POSITION[1] && (
        <p className="text-base-600 mt-4 font-normal leading-6">{desc}</p>
      )}
    </div>

    {(footerProps.linkText?.length > 0 ||
      footerProps.description?.length > 0) && (
      <div className="bg-base-50 rounded-md px-6 py-3.5">
        <div className="flex items-baseline justify-between">
          {footerProps.description?.length > 0 && (
            <p className="text-base-700 text-base font-normal leading-6">
              {footerProps.description}
            </p>
          )}

          {footerProps.linkText?.length > 0 && (
            <a
              href={footerProps.linkTo}
              className="text-brand-600 text-sm font-medium leading-5"
            >
              {footerProps.linkText}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          )}
        </div>
      </div>
    )}
  </div>
);

DataVisualization.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  descPosition: PropTypes.string,
  analytics: PropTypes.node,
  footerProps: PropTypes.shape({
    linkTo: PropTypes.string,
    linkText: PropTypes.string,
    description: PropTypes.string
  }),
  KpiProps: PropTypes.arrayOf({
    title: PropTypes.string,
    changeType: PropTypes.string,
    difference: PropTypes.string,
    description: PropTypes.string,
    percentage: PropTypes.string
  }),
  otherOptions: PropTypes.node,
  filterDropdown: PropTypes.node,
  headerInfo: PropTypes.bool,
  headerInfoTooltipProps: PropTypes.shape(TooltipPropTypes),
  wrapperClassName: PropTypes.string
};
DataVisualization.defaultProps = {
  size: DATA_VISUALIZATION_SIZES[1],
  title: '',
  desc: '',
  descPosition: DATA_VISUALIZATION_DESC_POSITION[0],
  analytics: null,
  footerProps: {},
  KpiProps: [],
  otherOptions: null,
  filterDropdown: null,
  headerInfo: true,
  headerInfoTooltipProps: {},
  wrapperClassName: ''
};

export default DataVisualization;
