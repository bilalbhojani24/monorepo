import { BrowserRouter } from 'react-router-dom';

import MainRoute from 'features/MainRoute';
import SideNav from 'features/SideNav';
import HeaderDummy from 'features/HeaderDummy';
// import Repository from './routes/Repository';

function App() {
  return (
    <BrowserRouter>
      <HeaderDummy />
      <div className="mt-16">
        <SideNav />
        <MainRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
