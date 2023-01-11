import { TMDrawer } from 'bifrostProxy';

import useTestCaseView from './useTestCaseView';

const TestCaseView = () => {
  const { hideTestCaseViewDrawer } = useTestCaseView();

  return (
    <div className="test pt-5">
      <TMDrawer
        bodyNode="test"
        title="Check Register flow as Tester"
        description=""
      />
    </div>
  );
};

export default TestCaseView;
