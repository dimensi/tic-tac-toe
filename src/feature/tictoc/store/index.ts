import { combine, guard, sample, merge, createEvent, createStore } from 'effector-logger';
import { last } from '../../../helpers';
import { calcWinner } from './calcWinner';

export const MAX_STEPS = Number(process.env.REACT_APP_MAX_STEPS || 3);

export const makeStep = createEvent<number>();
export const stepBack = createEvent<void>();
export const resetGame = createEvent<void>();

export type Players = 0 | 1;
export type Steps = Record<number, Players>;
export type History = Steps[];

const history = createStore<History>([]).reset(resetGame);
const player = createStore<Players>(0).reset(resetGame);
const winner = createStore<Players | -1>(-1).reset(resetGame);
const current = history.map(history => last(history) || {});

export const $game = combine({ player, winner, history, current });

const stepMade = guard(
  sample($game, makeStep, (game, idx) => [game, idx] as const),
  {
    filter: ([game, idx]) => {
      const needFirstStep = !(game.history.length === 0 && idx !== 0);
      if (!needFirstStep) return false;
      const isEmptyBox = !(idx in current);
      const gameIsEnd = game.winner !== -1;
      return isEmptyBox && !gameIsEnd;
    },
  }
);

const stepCancelled = guard(sample(history, stepBack), { filter: history => history.length !== 0 });

history.on(stepMade, (h, [game, idx]) => {
  const current = last(h);
  return h.concat({
    ...current,
    [idx]: game.player,
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
