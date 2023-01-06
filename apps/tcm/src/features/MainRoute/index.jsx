import { useLocation, Route, Routes } from 'react-router-dom';
import AppRoute from 'const/routes';
import classNames from 'classnames';

const MainRoute = () => {
  const location = useLocation();

  return (
    <div
      className={classNames('flex flex-1 flex-col', {
        'md:pl-64': location.pathname !== AppRoute.ROOT
      })}
    >
      <Routes>
        <Route path={AppRoute.ROOT} element={'Landing'}></Route>
        <Route path={AppRoute.PROJECTS} element={'Projects'}></Route>
        <Route path={AppRoute.REPO + '/:projectId'} element={'REPO'} />
        <Route path={AppRoute.REPO + '/:projectId/folder/:folderId'} element={'REPO'} />
        <Route exact path={AppRoute.TEST_CASES + '/:projectId'} element={'TEST_CASES'} />
        <Route exact path={AppRoute.TEST_RUNS + '/:projectId'} element={'TEST_RUNS'} />
      </Routes>
    </div>
  );
};

export default MainRoute;
