import React, { useContext } from 'react';
import { Button } from '@browserstack/bifrost';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

export default function CustomChartTooltip({ tooltipData }) {
  // const { logInsightsInteractionEvent, applyTestListFilter } =
  //   useContext(TestInsightsContext);

  //   `<div class="px-2 py-1 flex flex-col bg-base-800 rounded-lg text-base-200">${str}
  // //   <a class="text-white font-medium mt-0.5" href=${url} target="_blank">View all tests (Pro) </a></div>`

  // if (!isEmpty(data.point.pointRange)) {
  //       returnString += `<div><span class="font-sm">${getCustomTimeStamp({
  //         dateString: data.point.pointRange[0],
  //         withoutTime: true
  //       })} </span>`;
  //       returnString += ` - <span class="font-sm">${getCustomTimeStamp({
  //         dateString: data.point.pointRange[1],
  //         withoutTime: true
  //       })}</span></div>`;
  //     }

  const renderMetaData = (data) => {
    if (!isEmpty(data.point.pointRange)) {
      return (
        <div>
          <span className="text-sm">
            {getCustomTimeStamp({
              dateString: data.point.pointRange[0],
              withoutTime: true
            })}{' '}
            -{' '}
            {getCustomTimeStamp({
              dateString: data.point.pointRange[1],
              withoutTime: true
            })}
          </span>
        </div>
      );
    }
    return data.points.map((point) => 'random');
  };

  const handleActionClick = () => {};
  return (
    <div className="bg-base-800 text-base-200 flex flex-col rounded-lg px-2 py-1 text-white">
      <section className="border-brand-900 flex flex-col gap-1 border-b pb-2">
        {renderMetaData(tooltipData)}
        <p className="text-xs font-medium">{tooltipData?.name}</p>
        <p className="text-xs">
          <span
            className="mb-0.5 mr-1 inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: tooltipData?.color }}
          />
          <span>Failure rate: </span>
          <span className="font-semibold">{tooltipData?.colorValue}%</span>
        </p>
      </section>
      <section className="pointer-events-auto flex flex-col pt-1">
        <Button
          wrapperClassName="font-medium flex items-center gap-1 text-white hover:text-white hover:bg-brand-900 -mx-3 px-4 py-1 rounded-none"
          onClick={handleActionClick}
          variant="minimal"
        >
          Click to view tests
        </Button>
      </section>
    </div>
  );
}

CustomChartTooltip.propTypes = {
  tooltipData: PropTypes.objectOf(PropTypes.any).isRequired
};
