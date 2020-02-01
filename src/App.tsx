import * as React from "react";
import "./styles.css";
import { TicTac } from "./feature/tictoc/index";
import { CurrentPlayer } from "./feature/tictoc/components/CurrentPlayer";
import { stepBack, resetGame } from "./feature/tictoc/store";

export default function App() {
  return (
    <div className="App">
      {/* <button onClick={() => stepBack()}>to back</button>
      <button onClick={() => resetGame()}>reset</button>
      <CurrentPlayer /> */}
      <TicTac />
    </div>
  );
}
