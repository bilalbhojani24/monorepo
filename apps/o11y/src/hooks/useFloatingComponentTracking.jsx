import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addActiveFloatingComponent,
  removeActiveFloatingComponent
} from 'globalSlice/index';

function useFloatingComponentTracking(isVisible, componentId) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isVisible) {
      dispatch(addActiveFloatingComponent(componentId));
    } else {
      dispatch(removeActiveFloatingComponent(componentId));
    }

    return () => {
      dispatch(removeActiveFloatingComponent(componentId));
    };
  }, [componentId, dispatch, isVisible]);
}

export default useFloatingComponentTracking;
