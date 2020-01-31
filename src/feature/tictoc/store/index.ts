import {
  createEvent,
  createStore,
  combine,
  guard,
  sample,
  Store
} from "effector";
import { createMatrix, last } from "../../../helpers";

export const MAX_STEPS = Number(process.env.REACT_APP_MAX_STEPS);

export const makeStep = createEvent<number>();

export type Players = 0 | 1;
type Steps = Record<number, Players>;
type History = Steps[];

const player = createStore<Players>(0);
const winner = createStore<Players | -1>(-1);
const history = createStore<History>([]);
const current = history.map(history => history[history.length - 1] || {});

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
  const current = h[h.length - 1];
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
  if (MAX_STEPS > h.length) return -1
  return calcWinner(last(h))
})

type PlayerMatrix = number[]
function checkByX(points: PlayerMatrix) {
  let counter = 0;
  for (let i = 0; i < points.length; i++) {
    if (i % MAX_STEPS === 0) counter = 0;
    counter += points[i];
    if (counter === MAX_STEPS) break;
  }
  return counter === MAX_STEPS;
};

function checkByY(points: PlayerMatrix) {
  let counter = 0;
  for (let column = 0; column < MAX_STEPS; column++) {
    for (let i = 0; i < MAX_STEPS; i++) {
      counter += points[column + i * MAX_STEPS];
    }
    if (counter === MAX_STEPS) {
      break;
    } else {
      counter = 0;
    }
  }
  return counter === MAX_STEPS;
};

function checkByXY(points: PlayerMatrix) {
  let leftToRight = 0;
  let rightToLeft = 0;
  for (let x = 0; x < MAX_STEPS; x++) {
    leftToRight += points[x + x * MAX_STEPS];
    rightToLeft += points[(MAX_STEPS - 1) * (x + 1)];
  }

  return leftToRight === MAX_STEPS || rightToLeft === MAX_STEPS;
}

function checkPlayer(points: PlayerMatrix) {
  return checkByX(points) || checkByY(points) || checkByXY(points);
}

function calcWinner(current: Steps) {
  const players = Object.entries(current).reduce(
    (acc, [idx, player]) => {
      acc[player][+idx] = 1;
      return acc;
    },
    [createMatrix(MAX_STEPS), createMatrix(MAX_STEPS)]
  );
  return players.findIndex(playerMatrix => checkPlayer(playerMatrix)) as Players | -1
}