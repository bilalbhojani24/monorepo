import React from 'react';
import reactLogo from './assets/react.svg';
import Counter from './features/Counter';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="flex justify-center">
        <a className="p-8" href="https://vitejs.dev">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a className="p-8" href="https://reactjs.org">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="p-4">Vite + React</h1>
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
