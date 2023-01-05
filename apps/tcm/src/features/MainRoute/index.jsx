import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoute from 'const/routes';

const MainRoute = () => {
  return (
    <Routes>
      {/* <Route path={AppRoute.ROOT} element={'Landing'}></Route>
  <SideNav />
  <Route path={AppRoute.PROJECTS}>
    <Route index={true} element={<Counter />}></Route>
  </Route>
  <Route path={AppRoute.REPO + '/:projectId'} element={'REPO'} />
  <Route path={AppRoute.REPO + '/:projectId/folder/:folderId'} element={'REPO'} />
  <Route exact path={AppRoute.TEST_CASES + '/:projectId'} element={'TEST_CASES'} />
  <Route exact path={AppRoute.TEST_RUNS + '/:projectId'} element={'TEST_RUNS'} /> */}
    </Routes>
  );
};

export default MainRoute;
