import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { signInAcrion } from "./reducks/Users/actions";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.users);
  return (
    <div className="App">
      <header className="App-header">
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
        <button
          onClick={() =>
            dispatch(signInAcrion({ uid: "00002", username: "gumipo" }))
          }
        >
          おしてね
        </button>
      </header>
    </div>
  );
}

export default App;
