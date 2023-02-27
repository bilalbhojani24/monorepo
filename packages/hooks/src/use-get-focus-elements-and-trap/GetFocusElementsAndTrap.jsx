import { shape, any, bool } from 'prop-types';
import useGetFocusElementsAndTrap from './useGetFocusElementsAndTrap';

const GetFocusElementsAndTrap = ({ parentRef, reTrapFocus }) => {
  useGetFocusElementsAndTrap(parentRef, reTrapFocus);
  return null;
};

GetFocusElementsAndTrap.propTypes = {
  parentRef: shape({ current: any }).isRequired,
  reTrapFocus: shape({ shouldReTrapFocus: bool, shouldFocusFirstElement: bool })
};

GetFocusElementsAndTrap.defaultProps = {
  reTrapFocus: { shouldReTrapFocus: false, shouldFocusFirstElement: false }
};

export default GetFocusElementsAndTrap;
