import logo from './logo.svg';
import './App.scss';
import Button from '@mui/material/Button';
import React from 'react';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="foo-button mdc-button">
    <div className="mdc-button__ripple"></div>
    <span className="mdc-button__label">Button</span>
  </button>
  <Button variant="contained"></Button>
        </header>
    </div>
  );
}

export default App;
