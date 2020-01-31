import * as React from "react";
import "./styles.css";
import { TicTac } from "./feature/tictoc/index";
import { CurrentPlayer } from "./feature/tictoc/components/CurrentPlayer";

export default function App() {
  return (
    <div className="App">
      <CurrentPlayer />
      <TicTac />
    </div>
  );
}
