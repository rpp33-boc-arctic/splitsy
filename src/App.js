import logo from './logo.svg';
import './App.scss';

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
        <button class="foo-button mdc-button">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">Button</span>
  </button>
        </header>
    </div>
  );
}

export default App;
