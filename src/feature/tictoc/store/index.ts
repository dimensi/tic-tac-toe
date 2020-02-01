import {
  createEvent,
  createStore,
  combine,
  guard,
  sample,
} from "effector";
import { last } from "../../../helpers";
import { calcWinner } from "./calcWinner";

export const MAX_STEPS = Number(process.env.REACT_APP_MAX_STEPS || 3);

export const makeStep = createEvent<number>();

export type Players = 0 | 1;
export type Steps = Record<number, Players>;
export type History = Steps[];

const player = createStore<Players>(0);
const winner = createStore<Players | -1>(-1);
const history = createStore<History>([]);
const current = history.map(history => last(history) || {});

export const $game = combine({ player, winner, history, current });

const guardedStep = guard(
  sample($game, makeStep, (game, idx) => [game, idx] as const),
  {
    filter: ([game, idx]) => {
      const needFirstStep = !(game.history.length === 0 && idx !== 0);
      if (!needFirstStep) return false
      const isEmptyBox = !(idx in current);
      const gameIsEnd = game.winner !== -1;
      return isEmptyBox && !gameIsEnd;
    }
  }
);

history.on(guardedStep, (h, [game, idx]) => {
  const current = last(h);
  if (game.player === 0) {
    return h.concat({
      ...current,
      [idx]: game.player
    });
  }
  current[idx] = game.player;
  return [...h]
});

player.on(history, lastPlayer => (lastPlayer === 0 ? 1 : 0));

winner.on(history, (_, h) => {
  if (MAX_STEPS > h.length) return
  return calcWinner(last(h))
})