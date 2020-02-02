import React from 'react';
import { cn } from '../helpers';
import { Players } from '../feature';

const players = ['tic', 'tac'];
export function Cell({ player, xy }: { player: Players; xy: string }) {
  const [x, y] = xy.split(':');
  return <div className={cn('cell', players[player])} style={{ '--x': x, '--y': y }}></div>;
}
