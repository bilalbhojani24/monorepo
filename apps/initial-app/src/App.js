import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Alerts } from '@browserstack/bifrost';

console.log(Alerts);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Alerts />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a href="https://reactjs.org">Learn React</a>
      </header>
    </div>
  );
}

export default App;
