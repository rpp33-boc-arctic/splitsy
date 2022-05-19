import React from "react";
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Splitsy <br></br><br></br>
        Client Status: Active
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
