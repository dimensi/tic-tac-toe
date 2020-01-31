import React from "react";
import { useStore } from "effector-react";
import { MAX_STEPS, $game, makeStep } from "./store";
import { createMatrix } from "../../helpers";
import { Cell } from "./components/Cell";

const matrix = createMatrix(MAX_STEPS);
export function TicTac() {
  const { current } = useStore($game);
  return (
    <div className="ticTacGrid" style={{ "--size": MAX_STEPS }}>
      {matrix.map((_, i) => (
        <Cell key={i} player={current[i]} onClick={() => makeStep(i)} />
      ))}
    </div>
  );
}
