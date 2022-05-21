import logo from './logo.svg';
import './App.scss';
import Button from '@mui/material/Button';
import React from 'react';

// this
// interface MyProps {
//   string:string
// }

// interface MyState {
//   // value: string
// }
//({}: MyProps)

// or this

// this is saying that props is an object {} inside the object is string with type string
class FirstCompoeont extends React.Component< { string: string }> {

  constructor(props:any){
    super(props)
  }
  render(){
    return (<div >{this.props.string}</div>)
  }
}
// type MyProps = { ... };

function App() {
  let x:string = "a string";

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
  <FirstCompoeont string={x}/>
  <Button variant="contained"></Button>
        </header>
    </div>
  );
}

export default App;
