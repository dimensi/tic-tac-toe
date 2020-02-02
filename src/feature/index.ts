import { combine, createEvent, createStore, guard, merge, sample } from 'effector-logger';
import { MouseEvent } from 'react';
import { last } from '../helpers';
import { checkOnWin } from './checkOnWin';
import { Coords } from './coords';

export const MAX_STEPS = Number(process.env.REACT_APP_MAX_STEPS || 3);
export const BOX_SIZE = 40;

export type Players = 0 | 1;
export type Steps = Record<string, Players>;

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
      const isEmptyBox = !(coords.toString() in game.current);
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

winner.on(stepMade, (_, [game, step]) => {
  const howManyStepsNeedForChecking = MAX_STEPS * 2 - 2;
  if (howManyStepsNeedForChecking > game.history.length) return;
  return checkOnWin(game.current, step, game.player);
});

history.on(stepCancelled, history => {
  return history.slice(0, history.length - 1);
});
