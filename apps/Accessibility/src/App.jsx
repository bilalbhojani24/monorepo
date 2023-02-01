import React from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import { ACButton } from './middleware/bifrost';

function App() {
  return (
    <div>
      <AccessTimeFilledIcon />
      <ACButton variant="primary" colors="white" onClick={() => {}}>
        Cancel
      </ACButton>
    </div>
  );
}

export default App;
