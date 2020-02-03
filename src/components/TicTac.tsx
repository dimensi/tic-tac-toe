import React from 'react';
import { useStore } from 'effector-react';
import { $game, makeStep } from '../feature';
import { Cell } from './Cell';
import { VisualGrid } from './VisualGrid';

const playerColor = ['red', 'blue']
export function TicTac() {
  const { current, player } = useStore($game);
  // const [width, height] = useStore($fieldSize);
  return (
    <div
      className="ticTacGrid"
      style={{ '--border-color': playerColor[player] }}
      onClick={event => {
        makeStep(event);
      }}>
      <VisualGrid size={40} />
      {Object.entries(current).map(([xy, player], i) => (
        <Cell key={i} player={player} xy={xy} />
      ))}
    </div>
  );
}
