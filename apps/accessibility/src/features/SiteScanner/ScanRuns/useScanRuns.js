// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getScanRuns } from '../slices/dataSlice';
// import { getScanRunData } from '../slices/selector';

// export default function useScanRuns() {
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const scanRunData = useSelector(getScanRunData);

//   useEffect(() => {
//     setIsLoading(true);
//     dispatch(getScanRuns());
//   }, [dispatch]);

//   useEffect(() => {
//     if (scanRunData.data) {
//       setIsLoading(false);
//     }
//   }, [scanRunData]);

//   return {
//     scanRunData,
//     isLoading
//   };
// }
