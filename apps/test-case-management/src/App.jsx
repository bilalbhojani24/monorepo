import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppRoute from 'const/routes';
import Counter from 'features/Counter';
// import Repository from './routes/Repository';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={'Landing'}></Route>
        <Route path={AppRoute.PROJECTS}>
          <Route index={true} element={<Counter />}></Route>
        </Route>
        <Route path={AppRoute.REPO + '/:projectId'} element={'REPO'} />
        <Route path={AppRoute.REPO + '/:projectId/folder/:folderId'} element={'REPO'} />
        <Route exact path={AppRoute.TEST_CASES + '/:projectId'} element={'TEST_CASES'} />
        <Route exact path={AppRoute.TEST_RUNS + '/:projectId'} element={'TEST_RUNS'} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
