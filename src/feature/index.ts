import { combine, guard, sample, merge, createEvent, createStore } from 'effector-logger';
import { last } from '../helpers';
import { calcWinner } from './calcWinner';
import { MouseEvent } from 'react';

export const MAX_STEPS = Number(process.env.REACT_APP_MAX_STEPS || 3);
export const BOX_SIZE = 40;
export interface ICoords {
  x: number;
  y: number;
}

class Coords implements ICoords {
  x = 0;
  y = 0;
  constructor(event: MouseEvent) {
    this.x = Math.ceil(event.pageX / 40)
    this.y = Math.ceil(event.pageY / 40)
  }
  is(x: number, y: number) {
    return this.x === x && this.y === y
  }
  toString() {
    return `${this.x}/${this.y}`
  }
}

export type Players = 0 | 1;
export type Steps = Record<string, Players>

export type History = Steps[];

export const makeStep = createEvent<MouseEvent>();
export const stepBack = createEvent<void>();
export const resetGame = createEvent<void>();

const history = createStore<History>([]).reset(resetGame);
const player = createStore<Players>(0).reset(resetGame);
const winner = createStore<Players | -1>(-1).reset(resetGame);
const current = history.map(history => last(history) || {});

export const $game = combine({ player, winner, history, current });

const mappedStep = makeStep.filterMap(event => new Coords(event));

const stepMade = guard(
  sample($game, mappedStep, (game, coords) => [game, coords] as const),
  {
    filter: ([game, coords]) => {
      const needFirstStep = !(game.history.length === 0 && !coords.is(1, 1));
      if (!needFirstStep) return false;
      const isEmptyBox = !(coords.toString() in current);
      const gameIsEnd = game.winner !== -1;
      return isEmptyBox && !gameIsEnd;
    },
  }
);

const stepCancelled = guard(sample(history, stepBack), { filter: history => history.length !== 0 });

history.on(stepMade, (h, [game, coords]) => {
  const current = last(h);
  return h.concat({
    ...current,
    [coords.toString()]: game.player,
  });
});

player.on(merge([stepMade, stepCancelled]), lastPlayer => (lastPlayer === 0 ? 1 : 0));

winner.on(stepMade, (_, [{ history }]) => {
  if (MAX_STEPS > history.length) return;
  return calcWinner(last(history));
});

history.on(stepCancelled, history => {
  return history.slice(0, history.length - 1);
});
