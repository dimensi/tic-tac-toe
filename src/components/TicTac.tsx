import React from 'react';
import { useStore } from 'effector-react';
import { $game, makeStep } from '../feature';
import { Cell } from './Cell';
import { VisualGrid } from './VisualGrid';

export function TicTac() {
  const { current } = useStore($game);
  return (
    <div className="ticTacGrid" onClick={event => makeStep(event)}>
      <VisualGrid size={40} />
      {Object.entries(current).map(([xy, player], i) => (
        <Cell key={i} player={player} xy={xy} />
      ))}
    </div>
  );
}
