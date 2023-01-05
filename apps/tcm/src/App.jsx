import { BrowserRouter } from 'react-router-dom';

import MainRoute from 'features/MainRoute';
import SideNav from 'features/SideNav';
// import Repository from './routes/Repository';

function App() {
  return (
    <BrowserRouter>
      <SideNav />
    </BrowserRouter>
  );
}

export default App;
