// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   BsFillPersonFill,
//   MdAllInclusive,
//   MdOutlineAccessTime,
//   RiTimerLine,
//   Tooltip
// } from '@browserstack/bifrost';
// import { twClassNames } from '@browserstack/utils';
// import { TEST_STATUS } from 'constants/common';
// import { getActiveProject } from 'globalSlice/selectors';
// import { isEmpty } from 'lodash';
// import PropTypes from 'prop-types';
// import PropagationBlocker from 'testops/components/PropagationBlocker';
// import StatusIcon from 'testops/components/StatusIcon';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setActiveBuildId } from 'testops/TestList/slices/dataSlice';
// // import TagsComponent from 'trike/TagsComponent/components/TagsComponent';
// import { getBuildMarkedStatus } from 'utils/common';
// import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';
// import { getBuildPath } from 'utils/routeUtils';

// export default function UniqueBuildItem({ data }) {
//   const dispatch = useDispatch();
//   const history = useNavigate();
//   const activeProject = useSelector(getActiveProject);
//   const handleClick = () => {
//     if (data?.uuid) {
//       dispatch(setActiveBuildId(data?.uuid));
//     }
//     window.scrollTo(0, 0);
//     history.push(
//       getBuildPath(
//         activeProject.normalisedName,
//         data?.normalisedName,
//         data?.buildNumber
//       )
//     );
//   };
//   const handleTagClick = (key, value) => {
//     if (data?.uuid) {
//       dispatch(setActiveBuildId(data?.uuid));
//     }
//     history.push(
//       `${getBuildPath(
//         activeProject.normalisedName,
//         data?.normalisedName,
//         data?.buildNumber
//       )}?tab=tests&${key}=${value}`
//     );
//     dispatch(setAppliedFiltersTagsViaURL());
//   };
//   return (
//     // eslint-disable-next-line jsx-a11y/click-events-have-key-events
//     <div
//       className={twClassNames('border px-5 py-3', {
//         'border-t-2 border-red-600':
//           getBuildMarkedStatus(data?.status, data?.statusStats) === 'failed',
//         'border-t-2 border-green-500':
//           getBuildMarkedStatus(data?.status, data?.statusStats) === 'passed',
//         'border-t-2 border-gray-800':
//           getBuildMarkedStatus(data?.status, data?.statusStats) === 'skipped',
//         'border-t-2 border-orange-500':
//           getBuildMarkedStatus(data?.status, data?.statusStats) === 'unknown',
//         'border-t-2 border-blue-700':
//           getBuildMarkedStatus(data?.status, data?.statusStats) === 'pending'
//       })}
//       role="button"
//       tabIndex={0}
//       onClick={handleClick}
//     >
//       <div className="flex items-start justify-between">
//         <p className="text-base font-medium">{data?.name}</p>
//         {!!data?.ciBuildData?.name && (
//           <PropagationBlocker className="mt-1 flex shrink-0 items-center gap-1 font-medium">
//             <a
//               href={data?.ciBuildData?.buildUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="to-anchor d-inline-flex align-items-center"
//             >
//               <MdAllInclusive className="text-lg" />
//               {data?.ciBuildData.name}-{data?.ciBuildData?.buildNumber}
//             </a>
//           </PropagationBlocker>
//         )}
//       </div>
//       <div className="pb--2 mt-3 flex items-center justify-between border-b-slate-600">
//         <div className="tt-unique-run__statues">
//           <PropagationBlocker>
//             <p
//               className="tt-unique-run__statues--status"
//               role="presentation"
//               data-tip={TEST_STATUS.PASS}
//               onClick={() => {
//                 handleTagClick('status', TEST_STATUS.PASS);
//               }}
//             >
//               <span className="mr-1">
//                 <StatusIcon status={TEST_STATUS.PASS} size="small" />
//               </span>
//               <span>{data?.statusStats[TEST_STATUS.PASS]}</span>
//             </p>
//           </PropagationBlocker>
//           <PropagationBlocker>
//             <p
//               className="tt-unique-run__statues--status"
//               role="presentation"
//               data-tip={TEST_STATUS.FAIL}
//               onClick={() => {
//                 handleTagClick('status', TEST_STATUS.FAIL);
//               }}
//             >
//               <span className="mr-1">
//                 <StatusIcon status={TEST_STATUS.FAIL} size="small" />
//               </span>
//               <span>{data?.statusStats[TEST_STATUS.FAIL]}</span>
//             </p>
//           </PropagationBlocker>
//           <PropagationBlocker>
//             <p
//               className="tt-unique-run__statues--status"
//               role="presentation"
//               data-tip={TEST_STATUS.SKIPPED}
//               onClick={() => {
//                 handleTagClick('status', TEST_STATUS.SKIPPED);
//               }}
//             >
//               <span className="mr-1">
//                 <StatusIcon status={TEST_STATUS.SKIPPED} size="small" />
//               </span>
//               <span>{data?.statusStats[TEST_STATUS.SKIPPED]}</span>
//             </p>
//           </PropagationBlocker>
//           <PropagationBlocker>
//             <p
//               className="tt-unique-run__statues--status"
//               role="presentation"
//               data-tip={TEST_STATUS.UNKNOWN}
//               onClick={() => {
//                 handleTagClick('status', TEST_STATUS.UNKNOWN);
//               }}
//             >
//               <span className="mr-1">
//                 <StatusIcon status={TEST_STATUS.TIMEOUT} size="small" />
//               </span>
//               <span>{data?.statusStats[TEST_STATUS.TIMEOUT]}</span>
//             </p>
//           </PropagationBlocker>
//         </div>
//         {data?.duration && (
//           <p className="tt-unique-run__meta tt-unique-run__duration">
//             <RiTimerLine className="tt-unique-run__icon" />
//             {milliSecondsToTime(data?.duration)}
//           </p>
//         )}
//       </div>
//       <div className="tt-unique-run__mid-bottom">
//         <p className="tt-unique-run__meta">
//           <BsFillPersonFill className="tt-unique-run__icon" />
//           {data?.user}
//         </p>
//         <p className="tt-unique-run__meta">
//           <MdOutlineAccessTime className="tt-unique-run__icon" />
//           {getCustomTimeStamp({ dateString: data?.startedAt })}
//         </p>
//       </div>
//       {!isEmpty(data?.historyAggregate) && (
//         <PropagationBlocker className="tt-unique-run__bottom">
//           {!!data?.historyAggregate?.isFlaky && (
//             <TagsComponent
//               text={`Flaky (${data?.historyAggregate?.isFlaky})`}
//               wrapperClassName="to__flaky-tag"
//               onClick={() => handleTagClick('flaky', true)}
//             />
//           )}
//           {!!data?.historyAggregate?.isAlwaysFailing && (
//             <TagsComponent
//               text={`Always Failing (${data?.historyAggregate?.isAlwaysFailing})`}
//               wrapperClassName="to__error-tag"
//               onClick={() => handleTagClick('history', 'isAlwaysFailing')}
//             />
//           )}
//           {!!data?.historyAggregate?.isNewFailure && (
//             <TagsComponent
//               text={`New Failures (${data?.historyAggregate?.isNewFailure})`}
//               wrapperClassName="to__error-tag"
//               onClick={() => handleTagClick('history', 'isNewFailure')}
//             />
//           )}
//           {!!data?.historyAggregate?.isPerformanceAnomaly && (
//             <TagsComponent
//               text={`Performance Anomaly (${data?.historyAggregate?.isPerformanceAnomaly})`}
//               wrapperClassName="to__error-tag"
//               onClick={() => handleTagClick('history', 'isPerformanceAnomaly')}
//             />
//           )}
//         </PropagationBlocker>
//       )}
//       <Tooltip type="dark" place="bottom" />
//     </div>
//   );
// }

// UniqueBuildItem.propTypes = {
//   data: PropTypes.objectOf(PropTypes.any).isRequired
// };
